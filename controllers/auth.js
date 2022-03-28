import User from "../models/User.js";
import crypto from "crypto";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";

// register user
const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        // create user
        const user = await User.create({ username, email, password });
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};

// login user
const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return next(new ErrorResponse("please provide an email and password", 400));

    try {
        // find user form db with inputed email
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorResponse("invalid credentials", 401));

        // check is inputed password correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return next(new ErrorResponse("wrong password", 401));

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// forgot password initialization
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        // find user with inputed email
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        // get reset token and also set resetPasswordToken and resetPasswordExpire
        const resetToken = user.getResetPasswordToken();

        // save those two field to db
        await user.save();

        const resetUrl = `http://localhost:2000/api/auth/resetpassword/${resetToken}`;
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

        try {
            // try to send reset link mail
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            // if email send fail

            // remove resetPasswordToken and resetPasswordExpire from db
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500));
    }
};

// reset password
const resetPassword = async (req, res, next) => {
    // decrypt password reset token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        // find user with this token
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }, // expired date must be greater than now
        });
        if (!user) {
            return next(new ErrorResponse("invalid reset password token", 400));
        }
        user.password = req.body.password; // set new password
        user.resetPasswordToken = undefined; // remove token
        user.resetPasswordExpire = undefined; // remove token expire date
        await user.save();
        res.status(201).json({
            success: true,
            data: "password reset success",
        });
    } catch (error) {
        next(error);
    }
};

// send jwt token function
const sendToken = (user, statusCode, res) => {
    // get jwt token
    const token = user.getJwtToken();

    res.status(statusCode).json({ success: true, token });
};

export { register, login, resetPassword, forgotPassword };

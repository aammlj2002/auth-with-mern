import User from "../models/User.js";
import crypto from "crypto";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        sendToken(user, 201, res);
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) return next(new ErrorResponse("please provide an email and password", 400));

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorResponse("invalid credentials", 401));

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return next(new ErrorResponse("wrong password", 401));

        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse("No email could not be sent", 404));
        }

        const resetToken = user.getResetPasswordToken();
        console.log(user);

        await user.save();

        const resetUrl = `http://localhost:2000/api/auth/resetpassword/${resetToken}`;
        console.log(resetUrl);
        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password Reset Request",
                text: message,
            });

            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500));
    }
};

const resetPassword = async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        console.log(user);
        if (!user) {
            return next(new ErrorResponse("invalid reset password token", 400));
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        res.status(201).json({
            success: true,
            data: "password reset success",
        });
    } catch (error) {
        next(error);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    res.status(statusCode).json({ success: true, token });
};

export { register, login, resetPassword, forgotPassword };

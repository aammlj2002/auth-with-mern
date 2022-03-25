import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({
            success: true,
            user,
        });
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

        res.status(200).json({
            success: true,
            token: "lsj23jdsfj",
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const forgotPassword = (req, res, next) => {
    res.send("forgotPassword route");
};
const resetPassword = (req, res, next) => {
    res.send("resetPassword route");
};

export { register, login, resetPassword, forgotPassword };

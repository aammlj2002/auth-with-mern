import User from "../models/User.js";

const register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({ username, email, password });
        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404).json({ success: false, error: "invalid credentals" });
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            res.status(404).json({
                success: false,
                error: "invalid credentals",
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            res.status(404).json({
                success: false,
                error: "invalid credentals",
            });
        }
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

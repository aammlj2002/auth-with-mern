const register = (req, res, next) => {
    res.send("register route");
};
const login = (req, res, next) => {
    res.send("login route");
};
const forgotPassword = (req, res, next) => {
    res.send("forgotPassword route");
};
const resetPassword = (req, res, next) => {
    res.send("resetPassword route");
};

export { register, login, resetPassword, forgotPassword };

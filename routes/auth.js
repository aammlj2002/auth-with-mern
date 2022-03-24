import express from "express";
import {
    forgotPassword,
    login,
    register,
    resetPassword,
} from "../controllers/auth.js";
const Router = express.Router();

Router.route("/register").post(register);
Router.route("/login").post(login);
Router.route("/forgotpassword").post(forgotPassword);
Router.route("/resetpassword/:resetToken").put(resetPassword);

export default Router;

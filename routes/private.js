import express from "express";
import { getPrivateData } from "../controllers/private.js";
import { protect } from "../middleware/private.js";
const Router = express.Router();

Router.route("/").get(protect, getPrivateData);

export default Router;

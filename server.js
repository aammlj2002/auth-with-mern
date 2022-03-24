import "dotenv/config";
import express from "express";
import authRouter from "./routes/auth.js";
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT);

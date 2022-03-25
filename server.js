import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import ErrorHandler from "./middleware/errorHandler.js";
import authRouter from "./routes/auth.js";
import privateRouter from "./routes/private.js";
connectDB();
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

// Error handler
app.use(ErrorHandler);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT);

// log error
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});

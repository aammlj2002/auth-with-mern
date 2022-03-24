import "dotenv/config";
import express from "express";
const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`app is running at port ${PORT}`);
});

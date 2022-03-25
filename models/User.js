import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "please provide username"],
    },
    email: {
        type: String,
        required: [true, "please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "please provide a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "please add a password"],
        minlength: 8,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
    this.password = await bcrypt.hashSync(this.password, 10); // 10 is salt
    next();
});
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};
const User = mongoose.model("User", UserSchema);
export default User;

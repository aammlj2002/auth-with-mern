import mongoose from "mongoose";
import crypto from "crypto";
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
        required: [true, "please provide password"],
        minlength: 8,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

UserSchema.pre("save", function (next) {
    try {
        // hash inputed password
        this.password = bcrypt.hashSync(this.password, 10);
    } catch (error) {}
    next();
});
UserSchema.methods.matchPassword = async function (password) {
    // check user inputed password and password form the databasea
    return await bcrypt.compare(password, this.password);
};
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};
UserSchema.methods.getResetPasswordToken = function () {
    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // set encrypt reset token
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // set reset password token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes from now

    return resetToken;
};
const User = mongoose.model("User", UserSchema);
export default User;

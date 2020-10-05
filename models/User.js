const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please Enter a Valid Email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Length must be greated than 6"]
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;

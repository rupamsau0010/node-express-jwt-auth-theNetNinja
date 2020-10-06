const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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

// fire a function after doc saved to DB...
//userSchema.post("save", function(doc, next){
//    console.log(doc);
//    next();
//});

// fire a function before doc saved to DB...
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

const User = mongoose.model("user", userSchema);

module.exports = User;

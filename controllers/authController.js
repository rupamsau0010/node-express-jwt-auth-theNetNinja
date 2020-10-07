const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/User");

const app = express();

app.use(cookieParser());

// Handel Errors...
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: ""};

    // duplicate error handel...
    if(err.code === 11000) {
        errors.email = "email is already registrated";
        return errors;
    }

    // Validation Errors...
    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// Use JWT...
const maxAge = 3 * 24 * 60 * 60; // 3 days valid...

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge * 1000});
        console.log("User Created successfully...");
        res.status(201).json({ user: user._id });
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).send(errors);
    }   
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body;
    console.log(email + "\n" + password);

    res.send("login post");
}
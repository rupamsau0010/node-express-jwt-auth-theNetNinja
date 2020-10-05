const express = require("express");

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.signup_post = (req, res) => {
    res.send("new signup");
    const {email, password} = req.body;

    console.log(email + "\n" + password);
}

module.exports.login_post = (req, res) => {
    const {email, password} = req.body;
    console.log(email + "\n" + password);

    res.send("login post");
}
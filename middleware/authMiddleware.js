// Import Depandencies...
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware for Protecting routes...
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    
    // Check JWT exist or not...
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, docodeToken) => {
            if(err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(docodeToken);
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
}

// Middleware for Checking currect User for conditional rendering...
const chechUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, docodeToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(docodeToken);
                let user = await User.findById(docodeToken.id);
                console.log(user);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    } 
}

module.exports = { requireAuth, chechUser }; 
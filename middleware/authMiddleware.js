const jwt = require("jsonwebtoken");

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

module.exports = { requireAuth }; 
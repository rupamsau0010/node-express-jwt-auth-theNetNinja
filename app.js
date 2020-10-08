require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(3000 || process.env.PORT, function(){console.log("Database is connected to MongoDB Atlas \nServer is started on port 3000")}))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

// // Cookies...
// app.get("/set-cookies", (req, res) => {
//     // res.setHeader("Set-Cookie", "newUser=true");
//     res.cookie("newUser", false);
//     res.cookie("isEmployee", true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
//     res.send("You got the cookies");
// });

// app.get("/get-cookies", (req, res) => {
//     const cookie = req.cookies;
//     console.log(cookie);
//     res.json(cookie);
// });
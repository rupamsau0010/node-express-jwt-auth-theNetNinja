require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000 || process.env.PORT, function(){console.log("Database is connected to MongoDB Atlas \nServer is started on port 3000")}))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);
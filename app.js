//app require
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//passport require
const passport = require("passport");
const LocalStrategy = require("passport-local");

//models require
const Campground = require("./models/campgrounds.js");
const Comment = require("./models/comment");
const User = require("./models/user.js");
const seedDB = require("./seed.js");


//routes require
const campgroundRoutes = require("./routes/campgrounds.js");
const commentRoutes = require("./routes/comments.js");
const indexRoutes = require("./routes/index.js");

//config app
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelpcamp")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

//config passport
app.use(require("express-session")({
    secret: "Be peacefull and hardworking one.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


//Seeding data base
seedDB();
    
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server is working just fine!");
});
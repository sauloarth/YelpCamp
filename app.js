//app require
const express = require("express");
const app = express();
const config = require('config');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

//passport require
const passport = require("passport");
const LocalStrategy = require("passport-local");

//models require
const Campground = require("./models/campgrounds");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seed");


//routes require
const campgroundRoutes = require("./routes/campgrounds.js");
const commentRoutes = require("./routes/comments.js");
const indexRoutes = require("./routes/index.js");

//config app
app.set("view engine", "ejs");
mongoose.connect(config.get('DB.dbUrl'), {useNewUrlParser: true,useUnifiedTopology: true})
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

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
//seedDB();
    
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

const port = process.env.PORT || 3000

app.listen(port, function(){
    console.log("YelpCamp server is working just fine!");
});
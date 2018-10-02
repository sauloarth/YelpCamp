const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");


router.get("/", function(req, res){
    res.render("landing");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    const password = req.body.password;
    User.register(newUser, password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register");
        }
        
        passport.authenticate("local")
            (req, res, () => {
                res.redirect("/campgrounds");
            })
    })
})

router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", 
    passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),
    (req, res) => {
    
}) ;

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
})


//Middlewares
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
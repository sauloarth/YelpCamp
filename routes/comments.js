const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds.js");
const Comment = require("../models/comment.js");


router.get("/campgrounds/:id/comment/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) =>{
        if(err) {
            console.log(err);
        }
        else {
            res.render("comment/new", {campground:foundCamp});
        }
    });
    
});

router.post("/campgrounds/:id/comment", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) => {
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, (err, createdComment) => {
                if(err){
                    console.log(err);
                } else {
                    foundCamp.comments.push(createdComment);
                    foundCamp.save();
                    res.redirect("/campgrounds/" + foundCamp.id);
                }
            })
        }
    })
});

//Middlewares
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
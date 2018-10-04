const express = require("express");
const router = express.Router({mergeParams:true});
const Campground = require("../models/campgrounds.js");
const Comment = require("../models/comment.js");


router.get("/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) =>{
        if(err) {
            console.log(err);
        }
        else {
            res.render("comment/new", {campground:foundCamp});
        }
    });
    
});

router.post("/", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) => {
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, (err, createdComment) => {
                if(err){
                    console.log(err);
                } else {
                    createdComment.author.id = req.user.id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    foundCamp.comments.push(createdComment);
                    foundCamp.save();
                    res.redirect("/campgrounds/" + foundCamp.id);
                }
            })
        }
    })
});

router.get("/:comment_id/edit", function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else{
            res.render("comment/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
})

router.put("/:comment_id", function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Middlewares
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;
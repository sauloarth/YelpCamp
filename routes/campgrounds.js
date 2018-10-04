const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds.js");


router.get("/", function(req, res){
    Campground.find({}, function(err, results) {
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("Listing all campgrounds...");
            res.render("campground/index", {camps:results})
        }
    })
})

router.post("/", isLoggedIn, function(req, res){
    const newCampName = req.body.name;
    const newCampImage = req.body.image;
    const newCampDesc = req.body.desc;
    const newCamp = new Campground({
        name:newCampName, 
        image: newCampImage, 
        description: newCampDesc,
        author: {
            id: req.user.id,
            username: req.user.username
        }
        
    });
        
    Campground.create(newCamp, function(err, result){
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("New campground added like follow:");
            console.log(result);
        }
    });
    
    res.redirect("/campgrounds");
})

router.get("/new", isLoggedIn, function(req, res){
    res.render("campground/new");
});

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id) 
        .populate("comments") //name of property on campground schema
        .exec(function(err, result){
            if(err){
                console.log("Was impossible find the camp.");
            } else {
                res.render("campground/show", {foundCamp: result});
                console.log("Camp found and returned.");
            }
        });
});

router.get("/:id/edit", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
        } else{
            res.render("campground/edit", {campground: foundCamp});
        }
    });
});

router.put("/:id", isLoggedIn, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/:id", isLoggedIn, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
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
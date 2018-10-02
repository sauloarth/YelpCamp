const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds.js");


router.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, results) {
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("Listing all campgrounds...");
            res.render("campground/index", {camps:results})
        }
    })
})

router.post("/campgrounds", function(req, res){
    const newCampName = req.body.name;
    const newCampImage = req.body.image;
    const newCampDesc = req.body.desc;
    const newCamp = new Campground({
        name:newCampName, 
        image: newCampImage, 
        description: newCampDesc
        
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

router.get("/campgrounds/new", function(req, res){
    res.render("new");
});

router.get("/campgrounds/:id", function(req, res) {
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

//Middlewares
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
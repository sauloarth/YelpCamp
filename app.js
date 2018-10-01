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

//config app
mongoose.connect("mongodb://localhost/yelpcamp")
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

//config passport

//Seeding data base
seedDB();
    

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

// ==================
// CAMPGROUND ROUTE'S
// ==================

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, results) {
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("Listing all campgrounds...");
            res.render("campground/index", {camps:results})
        }
    })
})

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

app.get("/campgrounds/:id", function(req, res) {
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

// ===============
// COMMENT ROUTE'S
// ===============

app.get("/campgrounds/:id/comment/new", (req, res) => {
    Campground.findById(req.params.id, (err, foundCamp) =>{
        if(err) {
            console.log(err);
        }
        else {
            res.render("comment/new", {campground:foundCamp});
        }
    });
    
});

app.post("/campgrounds/:id/comment", (req, res) => {
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
})

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server is working just fine!");
});
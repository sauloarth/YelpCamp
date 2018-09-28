const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campgrounds.js");
const seedDB = require("./seed.js");


mongoose.connect("mongodb://localhost/yelpcamp")
app.use(bodyParser.urlencoded({extended:true}));

//Seeding data base
seedDB();
    

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

// =====================
// CAMPGROUNDS ROUTES
// =====================

app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, results) {
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("Listing all campgrounds...");
            res.render("index", {camps:results})
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
})

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id) 
        .populate("comments") //name of property on campground schema
        .exec(function(err, result){
            if(err){
                console.log("Was impossible find the camp.");
            } else {
                console.log(result)
                res.render("show", {foundCamp: result});
                console.log("Camp found and returned.");
            }
        })
})

// =====================
// COMMENTS ROUTES
// =====================



app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server is working just fine!");
});
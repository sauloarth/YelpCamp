const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelpcamp")
app.use(bodyParser.urlencoded({extended:true}));

    
const campgroundSchema = mongoose.Schema({
    name: String,
    image: String
})

const Campground = mongoose.model("Campground", campgroundSchema);

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgroups", function(req, res){
    Campground.find({}, function(err, results) {
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("Listing all campgroups...");
            res.render("campgroups", {camps:results})
        }
    })
})

app.post("/campgroups", function(req, res){
    const newCampName = req.body.name;
    const newCampImage = req.body.image;
    const newCamp = new Campground({name:newCampName, image: newCampImage});
    Campground.create(newCamp, function(err, result){
        if(err){
            console.log("Something went wrong!");
        } else {
            console.log("New campground added like follow:");
            console.log(result);
        }
    });
    
    res.redirect("/campgroups");
})

app.get("/campgroups/new", function(req, res){
    res.render("new");
})


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server is working just fine!");
});
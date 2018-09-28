const mongoose = require("mongoose");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comment");

const data = [
    {
        name:"Clouds Camp",
        image: "https://photosforclass.com/download/flickr-1514148183",
        description: "Below are just a few of the things parents are saying about their child's positive experience at Kingsley Pines. Please contact our office if you would like to talk with a parent in your area, whose child attended Kingsley Pines. If you would like to read about our campers' experiences, please see our Camp Memories Page."
    },
    {
        name:"Campclouse",
        image: "https://photosforclass.com/download/flickr-9647405948",
        description: "I just wanted to thank you for making my son Jon's summer camp experience OUTSTANDING! You guys are THE BEST! One of the most rewarding things that Jon expressed was  It was just like the video, everyone was awesome..so nice & friendly! Thanks to all of you, Jon will be attending next year! It is said that Disney is the happiest place on earth, but it pales in comparison to Kingsley Pines! You are all so down to earth & particularly tender kind hearted people."
    },
    {
        name: "Take rest",
        image: "https://photosforclass.com/download/flickr-6016438964",
        description: "We picked our first-time camper up today. She was ready to come home. Two weeks was perfect, she said. She was so exhausted from so much fun that she said she wanted to sleep in the car, have soup when she got home, and then cry herself to sleep because: It was too long of a wait for next year's camp session and, How would she get by without all her great new friends, and, Her cabin counselors were so amazing..."
    },
    {
        name: "Super Campground",
        image: "https://photosforclass.com/download/flickr-8240036928",
        description: "But what was most impressive to us was how she described a group of campers that were genuinely fun, high energy, humorous without being cruel or humiliating, light-hearted and easy-going, and civil. This is something your camp should be immensely proud of and something you should continue to strive to cultivate."
    }]
    
const comment = {
    text: "Wonder place to go! It seems Brazil paradise.",
    author: "Jonson Immar."
}

function seedDB() {
    
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            Comment.remove({}, function(err){
                if(err){
                    console.log(err);
                } else {
                    
                    console.log("Brand new DB.");
                    data.forEach(campground => {
                        Campground.create(campground, function(err, createdCamp){
                            if(err){
                                console.log(err);
                            } else {
                                console.log(createdCamp.name + " added into the DB.");
                                Comment.create(comment, function(err, createdComment){
                                    if(err){
                                        console.log(err);
                                    } else {
                                        createdCamp.comments.push(createdComment);
                                        createdCamp.save();
                                        console.log("Comment added to this campground.");       
                                    }
                                })//end of creating comment.
                            }
                        });//end of creating campground.
                    });
                    
                }
            })
        }
    });
    
}

module.exports = seedDB;
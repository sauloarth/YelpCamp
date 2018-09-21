const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server is working just fine!");
});
const express = require("express");
const app = express();

let camps = [
        {name:"PachaMama Camping", image: "https://media-cdn.tripadvisor.com/media/photo-s/0f/58/8f/89/area-de-camping-com-vista.jpg"},
        {name:"Camping Salto do Corumbá", image: "https://macamp.com.br/guia/wp-content/uploads//arquivos/guia/arquivos/1269/imagens/1714bab370dc2f59f935f00581657f371.jpg"},
        {name:"Jangadão Ecológico", image: "https://catracalivre.com.br/wp-content/uploads/2017/07/canions_do_rio_Araguaia5.jpg" },
    ]

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgroups", function(req, res){
    res.render("campgroups", {camps:camps})
})

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("YelpCamp server is working just fine!");
});
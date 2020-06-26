const https = require('https');

const fetch = require("node-fetch");

const express = require("express")

const ejs  = require("ejs")



const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");






app.get('/', async function(req, res){
	console.log("starting")
	
	var response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
	var data = await response.json();
	var getImage = await fetch(data.url);
	console.log("finsihed")
	console.log(data.title)
	console.log(data)
	


	res.render("index.ejs", {data:data, getImage:getImage});
		



});





app.listen(3000, function(){
	console.log("listening on port 3000");
})
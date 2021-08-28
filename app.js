const https = require('https');

const fetch = require("node-fetch");

const express = require("express")

const ejs  = require("ejs")



const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");






app.get('/', async function(req, res){
	console.log("home")




	res.render("index.ejs");




});



app.get('/pad', async function(req, res){
	console.log("fetching data")

	var response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
	var data = await response.json();
	var getImage = await fetch(data.url);
	console.log("finished")
	console.log(data.title)
	console.log(data)



	res.render("pad.ejs", {data:data, getImage:getImage})
});





app.listen(process.env.PORT || 3000, function(){
	console.log("listening on port 3000");
})

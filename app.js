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
	if(response.ok){
		var data = await response.json();
		var getImage = await fetch(data.url);
		console.log("finished...sucess")
		res.render("pad.ejs", {data:data, getImage:getImage})
	} else {
		console.log("ERROR: 404/api data error")
		res.send("ERROR: api data retrieval error.")
	}
});



app.get('/tech', async function(req,res){
	console.log("tech")
	res.render('tech.ejs')
});




app.get('/tech/patents', async function(req,res){

	console.log("starting api request")
	let w_response = await fetch("https://api.nasa.gov/techtransfer/patent/rocket?engine&api_key=DEMO_KEY");
	if(w_response.ok){
		let d1 = await w_response.json()
		console.log(d1.results[0])
		console.log("done")
		res.send("ok")
	} else{

		console.log("ERROR: 400/404/api request failed")
		res.send("bad request to api 400/404")
	}

});



app.listen(process.env.PORT || 3000, function(){
	console.log("listening on port 3000");
})

const https = require('https');

const fetch = require("node-fetch");

const express = require("express")

const ejs  = require("ejs")

const bp  = require("body-parser")


const app = express();

app.use(bp.urlencoded({
    extended: true
}));

app.use(express.json())

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




app.get('/patents', async function(req,res){


	res.render("patents.ejs")

});


app.get('/patents/:searchTerms', async function(req,res){
	console.log("starting api request")
  let e1 = req.params.searchTerms
  console.log(e1)
	let w_response = await fetch(`https://api.nasa.gov/techtransfer/patent/?${e1}&api_key=`);
	if(w_response.ok){
		let d1 = await w_response.json()
		console.log(d1.results[0])
		console.log("done")
    res.send(d1)

	} else{

	   console.log("ERROR: api request failed")
	   res.status(500)
     res.json({message:"something broke"})
	}
})





app.listen(process.env.PORT || 3000, function(){
	console.log("listening on port 3000");
})

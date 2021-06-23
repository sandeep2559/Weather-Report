const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "cec602c3e9885a46aa957a86b97af327"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" +unit;

    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;
        res.write("<h2>The weather is currently " + weatherDescription + "</h2>");
        res.write("<h1>The Temperature in " + query + " is " + temp + " degrees Celcius.</h1>");
        res.write("<img src=" + imageURL +">");
        res.send();

        });
    });

});

// const url = "https://api.openweathermap.org/data/2.5/weather?q=Dhanbad,India&appid=cec602c3e9885a46aa957a86b97af327&units=metric";
//     https.get(url,function(response){
        
//         response.on("data",function(data){
//             const weatherData = JSON.parse(data);
//             const temp = weatherData.main.temp;
//             const weatherDescription = weatherData.weather[0].description;

//         })
//     });



app.listen(5000,function(){
    console.log("Server is running on port 5000");
});
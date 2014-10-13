/**
  This is the heart of the server side  programming.
  
  This handles all the api calls using express framwe work over node 
  
  Refer to all the router methods.
  

*/
var https = require('https');
var fs = require('fs');
var express = require('express'),
bodyParser = require('body-parser'),
centerOfPopulation = require('./centerofpopulation.js'),
readFile = require('./readFile.js');


var inputCities;
var meanCenter;
var app = express();
app.use(bodyParser());

var port = 8080;

var router = express.Router();

// read the file when server starts up
// this can  be postponed to later stage when the 
// request comes 
// TODO VKT : optimization of this code 
readFile.getInputCities(
    function(resjson){
        inputCities=resjson;
});

// returns input cities lat/long data in [[lat1,long1][lat2,long2]] format
router.get('/COP/cities', function(req, res) {
    // DEBUG console.log("Input Cities are " +JSON.stringify(inputCities));
    res.statusCode=200;
    res.jsonp(inputCities);
});

//calculates the input data information to get mean center , also known as center of gravity
router.get('/COP/COP', function(req, res) {
    var outputData = new Object();
    readFile.getLatLongandPopulation ( function (listOfInputCitiesWithPopulation) {
        
        //DEBUG console.log("Returning data is "+listOfInputCitiesWithPopulation);
        centerOfPopulation.runAlgorithm(function (nearestCity,meanCenter) {
         
         outputData.nearestCity = nearestCity;
         outputData.meanCenter = meanCenter;
            
        },listOfInputCitiesWithPopulation);
      
        //should return only on sucess , else wait 
    res.statusCode=200;
    res.jsonp(outputData);
    });
});

        

// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);

/**
  This is reader functionality file. 
  
  This has 2 methods 
  
  a) getLatLongandPopulation : returns an array of Object (lat,long,population);
  b) getInputCities : returns an array of Object (lat,long)
  
  Other method in here is readfile which reads a valid json file 
  TODO  VKT: handle throw error when json.parse fails 
  TODO  VKT: handle case when input data is empty/missing one of the attributes
*/

var fs = require('fs');

var inputCitiesFile='./input_cities.json';

var inputCities = __dirname + '/'+inputCitiesFile;

/**
This method get all the data into object called LatLongandPopulation. 

//TODO : this can be optimized, we are currently reading file twice, but can be made 
// to read the file once and resuse it 

Reference     : server.js 
API Reference : /api/COP/COP
*/

exports.getLatLongandPopulation = function(callback) {
  readFile(function(returnCitiesData) {
      
     // console.log("readFile ::"+returnCitiesData);

     var citiesArr = new Array();
     var citiesArr = returnCitiesData.Cities;
     var cityPopulationLatLonArr = new Array();

      for (var i = 0 ;i <citiesArr.length;i++) {
            
          var latlongArr = new Object ();
        
          
          latlongArr.Latitude = citiesArr[i].Latitude;
          latlongArr.Longitude = citiesArr[i].Longitude;
          latlongArr.Population = citiesArr[i].Population;
           
          cityPopulationLatLonArr[i] = latlongArr;
      }
      //console.log("readFile::"+JSON.stringify(cityPopulationLatLonArr));
      callback(cityPopulationLatLonArr); 
      
  },inputCities);
};
             

/**
This method helps to plot the initial graph. It returns an array with each element
being an array of 2 elements (lat and long) i.e [[lat1,long1] [lat2,long2] ...]

Reference     : server.js 
API Reference : /api/COP/cities
*/
exports.getInputCities=function(callback) {
  readFile(function(returnCitiesData){
     //callback once data is read from the file 
     var citiesArr = new Array();
     citiesArr = returnCitiesData.Cities;

      var cityPopulationLatLonArr = new Array();
      var firstCity = new Array();
      for (var i = 0 ;i <citiesArr.length;i++) {
            
          var latlongArr = new Array ();
          
   
          
          latlongArr[0] = citiesArr[i].Latitude;
          latlongArr[1] = citiesArr[i].Longitude;
          
            if (i == 0) {
              firstCity=latlongArr;
          }
          cityPopulationLatLonArr[i] = latlongArr;
      }
      
      cityPopulationLatLonArr[cityPopulationLatLonArr.length]=firstCity;
      callback(cityPopulationLatLonArr); 
  },inputCities);
};

/**
  This function reads the inputfile and returns a json object 
  to callback method. 
  
  Contract for now  : everyone is happy and this isn't a invalid json
*/
function readFile(callback,inputFile) {
    
     fs.readFile(inputFile, 'utf8', function (err, data) {
         
      if (err) {
        console.log('Error: ' + err);
        return;
      }

      responseData = JSON.parse(data);
         
      callback(responseData);
    });
        
};
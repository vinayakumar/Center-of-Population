distanceCalc = require('./distancecalculator.js');
/**
This file contains all the methods to calculate Center of Population 
 using mean weighted center method. 
 
 We can add other algorithms , if required
 
 In this file , main methods are 
 
 a) runAlgorithm : which returns lat,long and also nearest city details 
 b) getMeanCenter : which calculates the mean 
          a) calculates weight for each co-oridnates based on population
          b) then calculate the mean value of all lat/long based on weight
          
 b) other methods are helpers methods.

*/
exports.runAlgorithm=function(callback,listOfInputCitiesWithPopulation) {
     
      var meanCenter = getMeanCenter(listOfInputCitiesWithPopulation);
     
      var nearestCityIndex = distanceCalc.getNearestCity(listOfInputCitiesWithPopulation,meanCenter);
    
      callback(listOfInputCitiesWithPopulation[nearestCityIndex],meanCenter); 
  };

/**
    This methods get the mean center for given set of lat/long co-ordinates 
    and there corresponding population
*/
function getMeanCenter (latLongPopulationArr) {
    assignWeights(latLongPopulationArr);
    var totalWeight = getTotalWeight(latLongPopulationArr);
    var sumLat = 0;
    var sumLong = 0;
    for (var i = 0; i < latLongPopulationArr.length;i++){
        
        var weight = latLongPopulationArr[i].Weight;
        var lat = latLongPopulationArr[i].Latitude;
        var lon = latLongPopulationArr[i].Longitude;
        
         sumLat += (weight * lat);
         sumLong += (weight *lon);

    }
    
    //DEBUG console.log("sumLat"+sumLat);
    //DEBUG console.log("sumLong"+sumLong);
    //DEBUG console.log("totalWeight"+totalWeight);


    var output = new Object();
      output.lat  = sumLat;
      output.long = sumLong;
    return output;
}




/*************************Helper Methods**************************/
/**
 This methods returns 1 always
*/
function getTotalWeight (dataArr) {
    
    var sum = 0;
    for (var i = 0 ; i< dataArr.length; i++) {
        sum += dataArr[i].Weight;
    }
    return sum;

}

/**
 This is used for calculating individual weighta per co-ordinates
*/
function getTotalPopulation (dataArr) {
    
    var sum = 0;
    for (var i = 0 ; i< dataArr.length; i++) {
        sum += dataArr[i].Population;
    }
    
    return sum;

}

/**
     Formula used here is :
     weight = (Currentpopulation)/(totalPopulation)
*/
function assignWeights (latLongPopulationArr) {
    
    var totalPopulation = getTotalPopulation(latLongPopulationArr);
    console.log("totalPopulation"+totalPopulation);
    
    for (var i = 0 ; i< latLongPopulationArr.length; i++) {
        latLongPopulationArr[i].Weight =  (latLongPopulationArr[i].Population/totalPopulation);
    }
    
    console.log ("Weight Data"+JSON.stringify(latLongPopulationArr));

}
/*************************Helper Methods**************************/

// TO BE DELETED 
//this is algorithm to run for COP 
// VKT add this at some other time
// icons: [{icon: google.maps.SymbolPath.FORWARD_CLOSED_ARROW}],





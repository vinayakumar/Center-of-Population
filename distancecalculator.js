/**
Given a lat and long, this will calculate distance b/w
two points and output the same in meters. The distance is calculated 
based on AS CROW FLIES Route
*/
function distanceCalc(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var radlon1 = Math.PI * lon1/180;
	var radlon2 = Math.PI * lon2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1609.344;  // To change to meters
	
    console.log("Distance :"+ dist/1000 +" kms");
	return dist;
}

exports.getNearestCity = function nearestCityFromPoint(listOfInputCities, point) {
    
    var minDistance = 0;
    var index= -1 ;
    for (var i = 0;i < listOfInputCities.length;i++) {

         console.log("Calculating Distance "+listOfInputCities[i].CityName);
         var distance = distanceCalc(point.lat,point.long,
                                                 listOfInputCities[i].Latitude, 
                                                 listOfInputCities[i].Longitude);
          
          if (i == 0 || distance < minDistance ) {
               minDistance = distance ;
               index = i;
          }
          
          listOfInputCities[i].distanceFromCOP = distance;
     }
     console.log("Minimum Distance is "+minDistance+" Population:"+listOfInputCities[index].CityName);
     return index;
}
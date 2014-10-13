/**

This is the client side javascript and handles all the display part of the maps 
and invoking of various RESTFUL API's
*/


var map;

/**
This method initialize the maps  with the input 
that is read from input_cities.json. It makes use 
of the restful api/COP/cities to get the set of 
cities
*/

function initialize() {
     //console.log("calling initialize");
    var urlPath = 'http://localhost:8080/api/COP/cities';
    var path;

    $.ajax({
        url: urlPath ,
        type: "GET",
        dataType: "jsonp",
        error: function(err){
            console.log("error in calling cities api. details:"+JSON.stringify(err));
        },
        //this is for drawing google maps
        success: function( data ) {
            map = new GMaps({
                el: '#map',
                lat: data[0][0],
                lng: data[0][1],
                zoom: 6,
                click: function(e){
                  console.log(e);
                }
            }); 

            console.log("data returned from cities rest api"+JSON.stringify(data));
            map.drawPolygon({
              paths: data,
              strokeColor: '#131540',
              strokeOpacity: 0.6,
              strokeWeight: 6,
            });
        }
    }); //end of ajax call
};

/**
This  method overlays on the top of existing map. 
This method adds the mean center point to the map 
It calls  api/COP/COP 
It also add nearest input city to the mean center

This method is called when the button "Click Me" is clicked.

*/

function overlayCOP(){
    
    console.log("OverLay Cop");
    var copUrlPath = 'http://localhost:8080/api/COP/COP';

    $.ajax({
    url: copUrlPath ,
    type: "GET",
    dataType: "jsonp",
            error: function(err){
                console.log("error calling the cop restful api"+JSON.stringify(err));
            },
            success: function( data ) {
                
                console.log("Data"+JSON.stringify(data));

                map.addMarker({
                lat: data.meanCenter.lat,
                lng: data.meanCenter.long,
                title: 'Center of Population',
                infoWindow: {
                  content: '<p> Cooridnates are'+ data.meanCenter.lat +':'+data.meanCenter.long+'</p>'
                }
              });   
                
                map.addMarker({
                    lat: data.nearestCity.Latitude,
                    lng: data.nearestCity.Longitude,
                    icons: [{icon: google.maps.SymbolPath.FORWARD_CLOSED_ARROW}],
                    title: 'Nearest City',
                    infoWindow: {
                    content: '<p> City Name :'+ data.nearestCity.CityName +'<br> Distance from Mean Center :'+(data.nearestCity.distanceFromCOP)/1000 +' kms</p>'
                    }
                    
                });
          } //end of success
    });
} // end of OverLayCOP

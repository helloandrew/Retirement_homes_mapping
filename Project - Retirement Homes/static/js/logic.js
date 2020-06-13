// Store API query variables
var urllist = ["/retirement_home", "/places_of_attraction"];
var markerslist = {};

// Grab the data with d3
urllist.forEach(function(url){
  d3.json(url, function(response) {
    console.log(response)
    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {

      // Set the data location property to a variable
      
      var location = JSON5.parse(response[i].geometry);
      // Check for location property
      if (location) {

        // Add a layer of markers to marketClusterGroup and bind a pop-up to each marker
        markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]]))

      }
      
    }
    markerslist[url] = markers;

})})
console.log(urllist[0]);

function createMap() {
    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  });

  // Only one base layer can be shown at a time
  var baseMaps = {
    Light: light,
    Dark: dark
  };

  // Overlays that may be toggled on or off
  var overlayMaps = {
    "Retirement Homes": markerslist['/retirement_home'],
    "Places of Attraction": markerslist['/places_of_attraction']
  };

  var myMap = L.map("map", {
    center: [43.6532, -79.3832],
    zoom: 11,
    layers: [light]
  });

  // Pass our map layers into our layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
};

function check(){
  if (typeof markerslist['/places_of_attraction'] === "undefined") {
    setTimeout(check, 250);
  } else {
    if (markerslist['/places_of_attraction']["_needsClustering"].length === 175) {
      console.log('yes');
      createMap();
    }
   else {
    setTimeout(check, 250);
  }d
}};

check(); 

//Get data from PHP
var pois = [];
$.get("./php/load-pois.php").done(function (data){
  data = data.substring(2, data.length -2);

  pois = data.split("],[");
  pois = pois.map(elem => elem.replace(/\"/g, ""));

  pois = pois.map(elem => elem.split(/,{1}(?=[^_|\s])/g)); 
  console.log(pois);

});

var cities = [];
$.get("./php/load-cities.php").done(function (data) {
  console.log(data);
  data = data.substring(2, data.length - 2);

  cities = data.split("],[");
  cities = cities.map(elem => elem.replace(/\"/g, ""));
  cities = cities.map(elem => elem.split(/,{1}(?=[^_|\s])/g));  
  console.log(cities);
});


var map1, map2;

// Stylings to make the maps blank
var myStyleTest = [
{
"elementType": "labels",
"stylers": [
{
  "visibility": "off"
}
]
},
{
"featureType": "administrative.neighborhood",
"stylers": [
{
  "visibility": "off"
}
]
}
];


function drawMap() {
setTimeout(function (){
var infoWindowSingle = new google.maps.InfoWindow;

var mapOptions = {
  zoom: 12.4999999,
  mapTypeControl: false,
  fullscreenControl: false,
  gestureHandling: 'none',
  zoomControl: false,
  streetViewControl:false,
  keyboardShortcuts: false
}

mapOptions.center = new google.maps.LatLng(cities[0][4], cities[0][5]); // Portsmouth
map1 = new google.maps.Map(document.getElementById("mapCanvas1"), mapOptions);

mapOptions.center = new google.maps.LatLng(cities[1][4],cities[1][5]); // Sydney
map2 = new google.maps.Map(document.getElementById("mapCanvas2"), mapOptions);

//Lat and Long pulled from MongoDB with NodeJS
// mapOptions.center = new google.maps.LatLng(localStorage.getItem('citylat1'), localStorage.getItem('citylon1')); // Portsmouth
// map1 = new google.maps.Map(document.getElementById("mapCanvas1"), mapOptions);

// mapOptions.center = new google.maps.LatLng(localStorage.getItem('citylat2'), localStorage.getItem('citylon2')); // Sydney
// map2 = new google.maps.Map(document.getElementById("mapCanvas2"), mapOptions);

map1.set('styles', myStyleTest); //Apply the stylings to make the maps blank
map2.set('styles', myStyleTest);      
  

var markerstest = [];
var index;

for(index = 0; index < pois.length; index++) {
  var tempMarker = {
    coords: {
      lat : parseFloat(pois[index][2]),
      lng : parseFloat(pois[index][3])
    },
    map : (pois[index][7] == "por" ? map1 : map2),
    
    content: pois[index][1]
  };
  markerstest.push(tempMarker);
};

console.log(markerstest);


// Loop through markers
console.log(markerstest.length);
for (var i = 0; i < markerstest.length; i++) {
  // Add marker
  addMarker(markerstest[i]);
  console.log(markerstest[i]);
}

function addMarker(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: props.map,
  });

  // Check for customicond
  if (props.iconImage) {
    // Set icon image
    marker.setIcon(props.iconImage);
  }

  // Click on the marker to show the POI's name and image
  if (props.content) {

    marker.addListener('click', function(){
      infoWindowSingle.setContent("<div style='float:left'><img src='https://i.imgur.com/5xzPg3f.png' style='width:50px;'></div><div style='float:right;padding: 5px;'>"+props.content+"</div>");
      infoWindowSingle.open(map2, marker);
    });
    

    marker.addListener('click', function(){
      infoWindowSingle.setContent("<div style='float:left'><img src='https://i.imgur.com/5xzPg3f.png' style='width:50px;'></div><div style='float:right;padding: 5px;'>"+props.content+"</div>");
      infoWindowSingle.open(map1, marker);
    });
    

  }
}

}, 0);
}

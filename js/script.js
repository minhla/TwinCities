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

mapOptions.center = new google.maps.LatLng(50.805832, -1.087222); // Portsmouth
map1 = new google.maps.Map(document.getElementById("mapCanvas1"), mapOptions);

mapOptions.center = new google.maps.LatLng(-33.865143, 151.209900); // Sydney
map2 = new google.maps.Map(document.getElementById("mapCanvas2"), mapOptions);

map1.set('styles', myStyleTest); //Apply the stylings to make the maps blank
map2.set('styles', myStyleTest);      

//This code is used for MySQL Database
// var markerstest = [];
// var index;

// for(index = 0; index < pois.length; index++) {
//   var tempMarker = {
//     coords: {
//       lat : parseFloat(pois[index][2]),
//       lng : parseFloat(pois[index][3])
//     },
//     map : (pois[index][7] == "por" ? map1 : map2),
    
//     content: pois[index][1]
//   };
//   markerstest.push(tempMarker);
// };

var icons = {
  museum: {
    icon: './images/statue.png'
  },
  bay: {
    icon: './images/cruise.png'
  },
  church: {
    icon: './images/church.png'
  },
  tourism: {
    icon: './images/camera.png'
  }
};

  // Array of markers
var markers = [{
    coords: {
      lat: -33.856634,
      lng: 151.215278
    },
    map: map2,
    content: 'Sydney Opera House',
    type: 'tourism'
  },
  {
    coords: {
      lat: 50.79557,
      lng: -1.10851
    },
    map: map1,
    content: 'Spinnaker Tower',
    type: 'tourism'
  },
  {
    coords: {
      lat: 50.80221,
      lng: -1.10885
    },
    map: map1,
    content: 'Mary Rose Museum',
    type: 'museum'
  },
  {
    coords: {
      lat: 50.82469,
      lng: -1.11744
    },
    map: map1,
    content: 'Portsmouth Harbour',
    type: 'bay'
  },
  {
    coords: {
      lat: 50.77799,
      lng: -1.08882
    },
    map: map1,
    content: 'Southsea Castle',
    type: 'tourism'
  },
  {
    coords: {
      lat: 50.80706,
      lng: -1.08721
    },
    map: map1,
    content: 'Charles Dickens Birthplace Museum',
    type: 'museum'
  },
  {
    coords: {
      lat: 50.80361,
      lng: -1.07666
    },
    map: map1,
    content: 'St Mary&#39;s Church',
    type: 'church'
  },
  {
    coords: {
      lat: 33.8712,
      lng: 151.2133
    },
    map: map1,
    content: 'St Mary&#39;s Cathedral',
    type: 'church'
  },
  {
    coords: {
      lat: -33.85457,
      lng: 151.20361
    },
    map: map2,
    content: 'Walsh Bay',
    type: 'bay'
  },
  {
    coords: {
      lat: -33.87315,
      lng: 151.20611
    },
    map: map2,
    content: 'Sydney Town Hall',
    type: 'tourism'
  },
  {
    coords: {
      lat: -33.90647,
      lng: 151.2035
    },
    map: map2,
    content: 'Green Square',
    type: 'tourism'
  },
  {
    coords: {
      lat: -33.8636,
      lng: 151.21144
    },
    map: map2,
    content: 'Museum of Sydney',
    type: 'museum'
  },
  {
    coords: {
      lat: -33.86737,
      lng: 151.19522
    },
    map: map2,
    content: 'The Star Sydney',
    type: 'tourism'
  },
  {
    coords: {
      lat: -33.86418,
      lng: 151.21657
    },
    map: map2,
    content: 'Royal Botanic Gardens',
    type: 'tourism'
  },
  {
    coords: {
      lat: -33.85457,
      lng: 151.20361
    },
    map: map2,
    content: 'Walsh Bay',
    type: 'bay'
  },
];


// Loop through markers
console.log(markers.length);
for (var i = 0; i < markers.length; i++) {
  // Add marker
  addMarker(markers[i]);
  console.log(markers[i]);
}

function addMarker(props) {
  var marker = new google.maps.Marker({
    position: props.coords,
    map: props.map,
  });


  // Click on the marker to show the POI's name and image
  if (props.content) {

    marker.addListener('click', function(){
      infoWindowSingle.setContent("<div style='float:left'><img src="+icons[props.type].icon+" style='width:45px;'></div><div style='float:right;padding: 5px;'>"+props.content+"</div>");
      infoWindowSingle.open(map2, marker);
    });
    

    marker.addListener('click', function(){
      infoWindowSingle.setContent("<div style='float:left'><img src="+icons[props.type].icon+" style='width:45px;'></div><div style='float:right;padding: 5px;'>"+props.content+"</div>");
      infoWindowSingle.open(map1, marker);
    });
    

  }
}

}, 0);
}

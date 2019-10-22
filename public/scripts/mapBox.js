//A hardcoded sample database
//I tried to create a variable similar to the one on tweeter to access to help understand but the functions below are not using it
mapsOfUser = [
  { map1 : {//map_id maybe?
    title: "First Map",
    markers: [
       {comment: "Toronto", coords: {lat: 43.6532, lng: -79.3832}},
       {comment: "Missisauga", coords: { lat: 43.5890, lng: -79.6441}},
       {comment: "Vaughan", coords: {lat: 43.8563, lng: -79.5085 }},
       {comment: "Richmond Hill", coords: {lat: 43.8828, lng: -79.4403 }},
    ]
  }}
]
//These are the variables that the functions below are using
//A query would pull up the maps that the user has created/favourited
//One Map created by user1
let markersForMap1 = [
  {comment: "Toronto", coords: {lat: 43.6532, lng: -79.3832}},
  {comment: "Missisauga", coords: { lat: 43.5890, lng: -79.6441}},
  {comment: "Vaughan", coords: {lat: 43.8563, lng: -79.5085 }},
  {comment: "Richmond Hill", coords: {lat: 43.8828, lng: -79.4403 }},
]

//Map 2 that the same user has created
let markersforMap2 = [
  {comment: "Toronto", coords: {lat: 43.6532, lng: -79.3832}},
  {comment: "Missisauga", coords: { lat: 43.5890, lng: -79.6441}},
  {comment: "Vaughan", coords: {lat: 43.8563, lng: -79.5085 }},
  {comment: "Richmond Hill", coords: {lat: 43.8828, lng: -79.4403 }},
]

//initialize MAP
function initMap() {
  //map options
  let options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 9
  }

  //creating maps
  let map = new google.maps.Map(document.getElementById('map'), options);
  let map2 = new google.maps.Map(document.getElementById('map2'), options);

  //create loop for first map
  for(const marker of markersForMap1) {
    addMarkers1(marker)
  }
  //loop for second map
  for(const marker of markersForMap2) {
    addMarkers2(marker)
  }

  function addMarkers1(data) {
    let marker = new google.maps.Marker({
      position: data.coords,
      map: map
    });
    if(data.comment){
      let infoWindow = new google.maps.InfoWindow({
        content:data.comment
      });
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }

  function addMarkers2(data) {
    let marker = new google.maps.Marker({
      position: data.coords,
      map: map2
    });
    if(data.comment){
      let infoWindow = new google.maps.InfoWindow({
        content:data.comment
      });
      marker.addListener('click', function(){
        infoWindow.open(map2, marker);
      });
    }
  }
}
//declaring a function which retrieves pin info
const getPins = function(data) {
  // const values = ;
  return pool.query(`SELECT * FROM pins
  WHERE user_id = 1`, values)

  //.then(res => res.rows[0]);
}

getPins().then(res => console.log(res))
exports.getPins = getPins;

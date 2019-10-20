//A hardcoded sample database
mapsOfUser = [
  { map1 : {//mapid maybe?
    title: "First Map",
    markers: [
       {comment: "Toronto", coords: {lat: 43.6532, lng: -79.3832}},
       {comment: "Missisauga", coords: { lat: 43.5890, lng: -79.6441}},
       {comment: "Vaughan", coords: {lat: 43.8563, lng: -79.5085 }},
       {comment: "Richmond Hill", coords: {lat: 43.8828, lng: -79.4403 }},
    ]
  }}
]

let markers = [
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
    zoom: 8
  }
  //find map id to place map
  let mapDiv = document.getElementById('map')
  //creating maps
  let map = new google.maps.Map(mapDiv, options);

  // let marker = new google.maps.Marker({
  //   position:{lat:43.6532,lng:-79.3832},
  //   map:map,
  //   //title: "Toronto"
  // });
  // let comment = "Toronto"

  // var infowindow = new google.maps.InfoWindow({
  //   content: comment
  // });
  //creates listener to open the comment for the marker
  // marker.addListener('click', function() {
  //   infowindow.open(map, marker);
  // });

  //create loop
  for(const marker of markers) {
    addMarkers(marker)
  }

  function addMarkers(data) {
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
}

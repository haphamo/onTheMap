//A hardcoded sample database

let pinsOfMap1 = [{ comment: 'Toronto', coords: {lat: 43.6532, lng: -79.3832 }}, { comment: 'Missisauga', coords: {lat: 43.5890, lng: -79.6441 }}];

let pinsOfMap2 = [{ comment: 'Vaughan', coords: {lat: 43.8563, lng: -79.5085 }}, { comment: 'Richmond Hill', coords: {lat: 43.8828, lng: -79.4403 }}];

//initialize MAP
function initMap() {
  //map options
  let options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  }
  //creating maps
  let map = new google.maps.Map(document.getElementById('map'), options);
  let map2 = new google.maps.Map(document.getElementById('map2'), options);
  //Listen for clicks for new markers for map
  google.maps.event.addListener(map, 'click', function(event){
    addMarker({coords:event.latLng});
  })
  google.maps.event.addListener(map2, 'click', function(event){
    addMarker({coords:event.latLng});
  })
  let createMarkersOnMap1 = new google.maps.Marker({
    position: pinsOfMap1[0].coords,
    map:map
  })
  let createMarkersOnMap2 = new google.maps.Marker({
    position: pinsOfMap1[1].coords,
    map:map2
  })
 for (let pin of pinsOfMap1) {
   addMarkerForMap1(pinsOfMap1[pin].coords);
 }
 for (let pin of pinsOfMap2) {
  addMarkerForMap2(pinsOfMap2[pin].coords);
}

//  marker.addListener('click', function(){
//     infoWindow.open(map, marker)
//   })
  function addMarkerForMap1(props){
    let marker = new google.maps.Marker({
    position: props.coords,
    map:map
  });
  }
  // function addMarkerForMap2(props){
  //   let marker = new google.maps.Marker({
  //   position: props.coords,
  //   map:map2
  // });
  // }

}

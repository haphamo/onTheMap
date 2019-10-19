//initialize MAP
let map, map2;
function initMap() {
  //map options
  let options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  }
  //new map
  map = new google.maps.Map(document.getElementById('map'), options);
  map2 = new google.maps.Map(document.getElementById('map2'), options);

  //Listen for clicks to add markers for map
  google.maps.event.addListener(map, 'click', function(event){
    addMarker({coords:event.latLng});
  })

  //hard coded markers
  let markers = [{coords: { lat: 43.6532, lng: -79.3832 }}, {coords: { lat: 43.5890, lng: -79.6441 }}];
  //created a loop for add markers for given latlng
  for (let marker in markers) {
   addMarker(markers[marker]);
  }
  //click listener to add markers
  marker.addListener('click', function(){
    infoWindow.open(map, marker)
  })

  function addMarker(props){
    let marker = new google.maps.Marker({
    position: props.coords,
    map:map,


  });
  }

}

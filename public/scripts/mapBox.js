//initialize MAP
let map;
function initMap() {
  //map options
  let options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  }
  //new map
  map = new google.maps.Map(document.getElementById('map'), options);

  //Listen for clicks for new markers

  google.maps.event.addListener(map, 'click', function(event){
    addMarker({coords:event.latLng});
    //Add marker
  })
  // //add marker
  // let marker = new google.maps.Marker({
  //   position:{ lat: 42.7652, lng: -80.5433 },
  //   map:map
  // });
  // //Added text box above marker
  // let infoWindow = new google.maps.InfoWindow({
  //   content: '<h1>title</h1>'
  // });
  // marker.addListener('click', function(){
  //   infoWindow.open(map, marker)
  // })

  //Create a function which adds marker

  let markers = [{coords: { lat: 42.7652, lng: -80.5433 }}, {coords: { lat: 42.9332, lng: -80.6643 }}];

 for (let marker in markers) {
   addMarker(markers[marker]);

 }
 marker.addListener('click', function(){
    infoWindow.open(map, marker)
  })
  function addMarker(props){
    let marker = new google.maps.Marker({
    position: props.coords,
    map:map
  });
  }

}

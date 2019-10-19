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
  let markers = [{coords: { lat: 43.6532, lng: -79.3832 }, content: "Toronto!"}, {coords: { lat: 43.5890, lng: -79.6441 }, content: 'Mississaga!'}];
  //created a loop for add markers for given latlng
  for (let marker in markers) {
   addMarker(markers[marker]);
  }
  //click listener to add markers
  marker.addListener('click', function(){
    infoWindow.open(map, marker)
  })
  //function which adds markers and displays comment
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map,

    });
    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }


}

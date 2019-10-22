//jQuery is clientside, queries on the database is server side
//must use AJAX method to send data back to the server

function initMap() {
  //hard coded options, still have to implement bounds.extend
  const options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 10
  }
  let map = new google.maps.Map(document.getElementById('map'), options);
  //do a query to retreive lat lng positions to place markers
  let marker = new google.maps.Marker({
    position: {
        lat: 43.6532,
        lng: -79.3832,
      },
    map: map

  });


  let searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('mapSearch'));

  google.maps.event.addDomListener(searchBox, 'places_changed', function() {
          let places = searchBox.getPlaces();
          let bounds = new google.maps.LatLngBounds();
          let i, place;

          for (i = 0; place = places[i]; i++) {
              bounds.extend(place.geometry.location);
              marker.setPosition(place.geometry.location);
          }
          map.fitBounds(bounds);
          map.setZoom(5);
      })



}


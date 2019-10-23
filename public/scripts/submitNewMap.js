//jQuery is clientside, queries on the database is server side
//must use AJAX method to send data back to the server

const markers = [];
function initMap() {
  //hard coded options, still have to implement bounds.extend
  const options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 10
  }
  let map = new google.maps.Map(document.getElementById('map'), options);
  //do a query to retreive lat lng positions to place markers
  // let marker = new google.maps.Marker({
  //   position: {
  //       lat: 43.6532,
  //       lng: -79.3832,
  //     },
  //   map: map

  // });


  let searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('mapSearch'));

  google.maps.event.addDomListener(searchBox, 'places_changed', function() {
          let places = searchBox.getPlaces();
          let marker = new google.maps.Marker({ position: {
          },
          map: map
          });

          let bounds = new google.maps.LatLngBounds();
          let i, place;

          for (i = 0; place = places[i]; i++) {
              bounds.extend(place.geometry.location);
              marker.setPosition(place.geometry.location);
          }
          map.fitBounds(bounds);
          temp = {lat: marker.position.lat(), lng: marker.position.lng()};
          markers.push(temp);
          map.setZoom(10);
          console.log(markers);
      })
}


$( document ).ready(function() {


  $('#crt-maps-btn').on('click', (evt) => {
    const data = {
      datatype: JSON,
      name: $('input[name=title]').val(),
      desc: $('new-map-desc').val(),
      markers: markers
    }
    // DO AN AJAX CALL TO BACKEND
    //BACKEND WILL DO THE QUERY
    //debugger;
    $.ajax('/maps/create', {method: 'POST', data: $(this).serialize()})
    //.then(res => window.location = "/maps")
    .then(res => console.log(data))
    console.log(data)

    //alert("BUTTON WORKS????")
  })

  // $(function() {
  //   const $form = $('#submit-new-map"')
  //   $form.submit(function(e) {
  //     e.preventDefault();

  //   })
  // });
})

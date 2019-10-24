//jQuery is clientside, queries on the database is server side
//must use AJAX method to send data back to the server


const markers = [];
function initMap() {
  //hard coded options, still have to implement bounds.extend
  const options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 10,
    styles: [
      {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "lightness": 13
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#144b53"
          },
          {
            "lightness": 14
          },
          {
            "weight": 1.4
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
          {
            "color": "#08304b"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0c4152"
          },
          {
            "lightness": 5
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0b434f"
          },
          {
            "lightness": 25
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#0b3d51"
          },
          {
            "lightness": 16
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
          {
            "color": "#146474"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#021019"
          }
        ]
      }
    ]
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
  // <iframe src="https://snazzymaps.com/embed/194806" width="100%" height="400px" style="border:none;"></iframe>

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
          console.log("places", places)
          for (i = 0; place = places[i]; i++) {
              bounds.extend(place.geometry.location);
              marker.setPosition(place.geometry.location);
          }
          map.fitBounds(bounds);
          temp = {lat: marker.position.lat(), lng: marker.position.lng(), comment: places[0].name};
          markers.push(temp);
          map.setZoom(10);
          console.log(markers);
      })

}


$( document ).ready(function() {


  $('#crt-maps-btn').on('click', (evt) => {
    //debugger
    evt.preventDefault();
    const data = {
      datatype: JSON,
        title: $('input[name=title').val(),
        description: $('input[name=description').val(),
      markers: markers
    }
    // DO AN AJAX CALL TO BACKEND
    //BACKEND WILL DO THE QUERY

    $.ajax('/maps/create', {method: 'POST', data: data})
    //.then(res => window.location = "/maps")
    .then(res =>{
      console.log(res);

      window.location.href = '/maps/'+ res.mapId;
    })

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

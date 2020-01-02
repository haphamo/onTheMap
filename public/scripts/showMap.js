let map,
  markers = [],
  url = $(location).attr('href'),
  parts = url.split("/"),
  mapId = parts[parts.length - 1],
  pinMarkers = {};

function initMap() {
  //creating maps
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 43.6532, lng: -79.3832 },
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
  });
  let searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('mapSearch'));

  google.maps.event.addDomListener(searchBox, 'places_changed', function () {
    let places = searchBox.getPlaces();
    let marker = new google.maps.Marker({
      position: {
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
    temp = { lat: marker.position.lat(), lng: marker.position.lng(), comment: places[0].name };
    markers.push(temp);
    map.setZoom(10);
    console.log(markers);
  })

}

$(() => {
  //console.log("loaded");
  //console.log(mapId)
  $.ajax(`/api/maps/${mapId}/pins`, { method: 'get' })
    //.then(res => window.location = "/maps")
    .then(res => {
      console.log(map)
      console.log("res.result", res.result);
      res.result.forEach(element => {

        let latLng = new google.maps.LatLng(parseFloat(element.latitude), parseFloat(element.longitude))
        //let bounds = new google.maps.LatLngBounds();
        //bounds.extend(parseFloat(element.latitude), parseFloat(element.longitude)).getPosition
        let marker = new google.maps.Marker({
          position: latLng,
          map: map
        })
        marker.setMap(map);
        pinMarkers[element.id] = marker;
        $('#pin-list').append(`
          <li class="deletePin" data-pinid="${element.id}">
            <button onclick="deletePin(${element.id})">
              ${element.comment}
            </button>
          </li>
        `)
      });
      //map.fitBounds(bounds);
      //delete event listener
      //delete map listener
      $('#deleteMap').click(function () {
        const mapId = $(this).data('map-id');
        $.ajax(`/api/maps/${mapId}`, { method: 'delete' })
        .then((res) => {
          // console.log(res)
          window.location.href = '/maps/'
          return true;
        })
      })
      return true;
    })
})

const updateMaps = () => {
  const data = {
    datatype: JSON,
    markers
  }

  $.ajax(`/api/maps/${mapId}/pins`, { method: 'POST', data })
  location.reload();
}

const deletePin = pinId => {
  const pinParentMarkup = $(`[data-pinid="${pinId}"]`);
  $.ajax(`/api/maps/${mapId}/pins/${pinId}`, { method: 'delete' })
    .then(() => {
      pinParentMarkup.remove();
      const marker = pinMarkers[pinId];
      marker.setMap(null)
      delete pinMarkers[pinId]
      return true;
    })
}

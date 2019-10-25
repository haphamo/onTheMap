let map;
markers = [];

function initMap() {
  //creating maps
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 10
  });
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



$(() => {
  //console.log("loaded");
  let url = $(location).attr('href'),
    parts = url.split("/"),
    mapId = parts[parts.length-1];
  //console.log(mapId)
  $.ajax(`/api/maps/${mapId}/pins`, {method: 'get'})
  //.then(res => window.location = "/maps")
  .then(res =>{
        let pinMarkers = {};
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
          $('#pin-list').append(`<li class="deletePin"><button data-pinid="${element.id}">${element.comment}</button></li>`)
        });
        //map.fitBounds(bounds);
        //delete event listener
        $('.deletePin button').click(function(){
          const pinId = $(this).data('pinid');
          const elt = $(this).parent();
          $.ajax(`/api/maps/${mapId}/pins/${pinId}`, {method: 'delete'})
          .then(() => {
            elt.remove();
            const marker = pinMarkers[pinId];
            marker.setMap(null)
            delete pinMarkers[pinId]
            return true;
          })
        })
        //delete map listener
        $('#deleteMap').click(function(){
          const mapId = $(this).data('map-id');
          $.ajax(`/api/maps/${mapId}`, {method: 'delete'})
          .then((res) => {
            console.log(res)
            window.location.href = '/maps/'
            return true;
          })
        })
        $('#update-maps-btn').on('click', (evt) => {
          //debugger
          evt.preventDefault();
          const data = {
            datatype: JSON,
            markers
          }
          $.ajax(`/api/maps/${mapId}/pins`, {method: 'POST', data})

          //alert("BUTTON WORKS????")
        })

        return true;

      })

})

// gets list of users maps
// $.ajax(`/maps/`, {method: 'get'})
//   //.then(res => window.location = "/maps")
//   .then(res =>{console.log(res)
//   })


  // $.ajax(`/maps/`, {method: 'get'})
  // //.then(res => window.location = "/maps")
  // .then(res =>{console.log(res)
  // })
  // $('#pin-list').append(`<li class="deletePin"><button data-pinid="${element.id}">${element.comment}</button></li>`)
// var bounds = new google.maps.LatLngBounds();
// for (var i = 0; i < markers.length; i++) {
//  bounds.extend(markers[i].getPosition());
// }

// map.fitBounds(bounds);

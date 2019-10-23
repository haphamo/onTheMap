// //Make ajax call after user hits submit


//this function creates the title and desc from api
// const createMapElement = function (mapdata) {//mapdata is the route /api/map/
//   const mapMarkup = `
//   <div id="user_map" class="maps"></div>
//   <div class="map_title">
//   <h2>Helloooo</h2>
//   </div>
//   <div>
//     <h2>${map.data.description}</h2>
//   </div>`;
//   return mapMarkup;
// }

//render one map

// const renderMap = function(mapData) {
//   const maps = createMapElement(mapData)
//   $("map-container").append(maps)
// }

// //ajax call on the sumbit button when the user creates new map

// $(document).ready(function() {
//   $('#crt-maps-btn').on('click', (evt) => {
//     //debugger
//     //prevent default
//     evt.preventDefault();
//     const data = {
//       datatype: JSON,
//         title: $('input[name=title').val(),
//         description: $('input[name=description').val(),
//       markers: markers
//     }

//     $.ajax('/api/maps/8', {method: 'POST', data: data})
//     //.then(res => window.location = "/maps")
//     .then(res =>{
//       console.log(res);
//       window.location.href = '/maps';
//     })

//     console.log(data)

//     //alert("BUTTON WORKS????")
//   })
//     const loadMaps = async () => {
//     try {
//       const response = await $.ajax ({ url : '/api/maps/8' , type: "GET", dataType: 'JSON' });
//       renderMap(response);
//         }
//     catch (error) {
//       console.log(error);
//     }
//   };
//   loadMaps();

// })

let map;
markers = [];

function initMap() {
  //map options
  let options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 11
  }

  //creating maps
  map = new google.maps.Map(document.getElementById('map-container'), options);
  // latLng = new google.maps.LatLng(43.6532, -79.3832)
  // console.log(markers)
  // //create loop for first map
  // // for(const marker of markers) {
  // //   addMarkers(marker)
  // // }

  // let marker = new google.maps.Marker({
  //   position: latLng,
  //   map: map
  // });
  // marker.setMap(map);



  // fetch("/api/pins")
  // .then(resp => resp.json())
  // .then(data => {
  //   for(const marker of data.pins) {
  //     // addMarkers2(marker)
  //   }
  //   return true
  // })

  // function addMarkers1(data) {
  //   let marker = new google.maps.Marker({
  //     position: data.coords,
  //     map: map
  //   });
  //   if(data.comment){
  //     let infoWindow = new google.maps.InfoWindow({
  //       content:data.comment
  //     });
  //     marker.addListener('click', function(){
  //       infoWindow.open(map, marker);
  //     });
  //   }
  // }

  // function addMarkers2(data) {
  //   let marker = new google.maps.Marker({
  //     position: data.coords,
  //     map: map2
  //   });
  //   if(data.comment){
  //     let infoWindow = new google.maps.InfoWindow({
  //       content:data.comment
  //     });
  //     marker.addListener('click', function(){
  //       infoWindow.open(map2, marker);
  //     });
  //   }
  // }
}



$(() => {
  console.log("loaded");
  let url = $(location).attr('href'),
    parts = url.split("/"),
    last_part = parts[parts.length-1];
  console.log(last_part)
  $.ajax(`/api/maps/${last_part}`, {method: 'get'})
      //.then(res => window.location = "/maps")
      .then(res =>{
        console.log(map)
        console.log(res.result[0].latitude);
        temp = {lat: parseFloat(res.result[0].latitude), lng: parseFloat(res.result[0].longitude)};
        markers.push(temp);
        temp2 = {lat: parseFloat(res.result[1].latitude), lng: parseFloat(res.result[1].longitude)};
        markers.push(temp2);
        console.log("markers", markers[0]);
        console.log("gthis one", markers[0].lat)
        latLng = new google.maps.LatLng(markers[0].lat, markers[0].lng)
  console.log(markers)
  //create loop for first map
  // for(const marker of markers) {
  //   addMarkers(marker)
  // }

  let marker = new google.maps.Marker({
    position: latLng,
    map: map
  });
  marker.setMap(map);
        //window.location.href = '/maps';
      })

})

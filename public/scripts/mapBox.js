
//These are the variables that the functions below are using
//A query would pull up the maps that the user has created/favourited
//One Map created by user1
// let markersForMap1 = [
//   {comment: "Toronto", coords: {lat: 43.6532, lng: -79.3832}},
//   {comment: "Missisauga", coords: { lat: 43.5890, lng: -79.6441}},
//   {comment: "Vaughan", coords: {lat: 43.8563, lng: -79.5085 }},
//   {comment: "Richmond Hill", coords: {lat: 43.8828, lng: -79.4403 }},
// ]

//Map 2 that the same user has created
// let markersforMap2 = [
//   {comment: "Toronto", coords: {lat: 43.6532, lng: -79.3832}},
//   {comment: "Missisauga", coords: { lat: 43.5890, lng: -79.6441}},
//   {comment: "Vaughan", coords: {lat: 43.8563, lng: -79.5085 }},
//   {comment: "Richmond Hill", coords: {lat: 43.8828, lng: -79.4403 }},
// ]



//initialize MAP
function initMap() {
  //map options
  let options = {
    center: {lat: 43.6532, lng: -79.3832},
    zoom: 8
  }

  //creating maps
  let map = new google.maps.Map(document.getElementById('user_map'), options);
  // let map2 = new google.maps.Map(document.getElementById('map2'), options);

  //create loop for first map
  for(const marker of markersForMap1) {
    addMarkers1(marker)
  }
  //loop for second map
  // for(const marker of markersForMap2) {
  //   addMarkers2(marker)
  // }

  // fetch("/api/pins")
  // .then(resp => resp.json())
  // .then(data => {
  //   for(const marker of data.pins) {
  //     addMarkers1(marker)
  //   }
  //   return true
  // })

  function addMarkers1(data) {
    let marker = new google.maps.Marker({
      position: data.coords,
      map: map
    });
    if(data.comment){
      let infoWindow = new google.maps.InfoWindow({
        content:data.comment
      });
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    }
  }

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
//declaring a function which retrieves pin info
// const getPins = function() {
//   let coords = db.query(`SELECT pins.latitude, pins.longitude FROM pins;`);
//   let comment = db.query(`SELECT pins.comment FROM pins;`);
//   let mapOptions;

//   mapOptions[comment];
//   mapOptions[coords];

//   return mapOptions;
// }

// getPins().then(res => console.log(res))
// exports.getPins =  getPins;
// $(document).ready(function () {
//   $(".slide-toggle").click(function () {
//     if ($(".nav_div").css('display') === "none") {
//       $('.nav_div').slideDown('slow');
//     } else {
//       $('.nav_div').slideUp('slow')
//     }
//     $('.login').focus()
//   })
// });

$(document).ready(function () {

  $(".btn").on('click', function () {
    $(".nav_div").slideToggle('fast', function () {
      if ($(this).is(':visible'))
      $(this).css('display', 'flex');
    });
  });
})

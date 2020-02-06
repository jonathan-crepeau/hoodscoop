const icon = {
  url: ('./images/pin-icon-png-11-transparent.png'),
  scaledSize: new google.maps.Size(50,50),
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0)
};

const onSuccess = async (response) => {
  try {
    response._embedded.events.forEach((event) => {
      // console.log(event._embedded.venues[0].city);
      const name = event.name;
      const distance = event.distance;
      const image = event.images[0].url;
      const id = event.id;
      const segment = event.classifications[0].segment.name;
      const genre = event.classifications[0].genre.name;
      const lng = JSON.parse(event._embedded.venues[0].location.longitude);
      const lat = JSON.parse(event._embedded.venues[0].location.latitude);
      const location = {lng: lng, lat:lat};
      const eqPin = new google.maps.Marker({position: location, map: map, icon: icon, animation:google.maps.Animation.BOUNCE}); //, icon: icon
      var infowindow = new google.maps.InfoWindow({
        content: `<div class="card-header">${name}</div>
        <img src="${image}" class="card-img-top" alt="...">`
      });
      eqPin.addListener('click', function() {
        infowindow.open(map, eqPin);
      });

      

      $('.card-columns').append(`
        <div class="card text-white bg-dark mt-1">
          <div class="card-header" id="${id}"><button type="button" class="heart btn btn-outline-danger"><i class="far fa-heart"></button></i> ${name}</div>
          <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-title" id="genre">${segment}/${genre}</p>
              <p class="card-text" id="distance">Distance:<br>${distance}miles</p>
            <button type="button" class="expanded expand btn btn-secondary btn-lg btn-block">Expand</button>
            </div>
        </div>
      `)
    }); // result is an object which is created from the returned JSON
  } catch (err) {
    console.log(err);
  }
};


// const favoriteSuccess = async (response) => {
//     try {
//       const name = event.name;
//       const distance = event.distance;
//       const id = event.id;
//     }
//     catch (err){}
// }


const faveButton = $('.heart');
const expandButton = $('.expand')

const favorites = [];

// const addToFavorites = () => {
//   // discuss with johnathan
//   // get these values from the header of the card or directly from pin
//
//   const name = document.getElementById('');
//   const id = document.getElementById('');
//
//   const favoriteData = {
//       eventName: name.value,
//       eventId: id.value,
//   };
//
//
// }

// faveButton.on("click", addToFavorites)

$("#cardy").on("click", '.heart', function() {
 //   $(this).toggleClass("btn-outline-danger").toggleClass("btn-danger")
 //   if ($(this).hasClass("btn-danger")) {
 //     $(this).parent().parent().css({"color": "red", "border": "2px solid red"});
 //     // favorites.push($(this).parent().parent())
 //     db.User.findById(req.session.currentUser, (err,foundUser)=>{
 //       if (err) {
 //           return console.log(err)
 //        }
 //
 //       console.log(foundUser.favorites)
 //   })
 // }
 //   else if ($(this).hasClass("btn-outline-danger")) {
 //     favorites.splice(favorites.indexOf($(this).parent().parent()), 1)
 //     console.log("OH MA GAWD: ", favorites)
 //     $(this).parent().parent().empty()
 //   }
   const name = $(this).parent().text();
   const id = $(this).parent().attr('id');
   const distance = $(this).parent().parent().children('.card-body').find('.card-text').text();
   const segment = $(this).parent().parent().children('.card-body').find('.card-title').text();

   const distanceNum =  distance.match(/\d+/g)
   const finalDistance = distanceNum.join('.')
   console.log(segment)

   const favoriteData = {
       eventName: name,
       eventId: id,
       distance: finalDistance,
       genre: segment
   }


 $(this).toggleClass("btn-outline-danger").toggleClass("btn-danger")
 if ($(this).hasClass("btn-danger")) {
   $(this).parent().parent().css({"color": "red", "border": "2px solid red"});
   // favorites.push($(this).parent().parent())
   $.ajax({
     method: "POST",
     url: `/api/favorites/${favoriteData.eventId}`,
     contentType: "application/json; charset=utf-8",
     headers: {
       withCredentials: true,
     },
     data: JSON.stringify(favoriteData),
     success : function(result) {
       console.log(result); // result is an object which is created from the returned JSON
     },
     error: function(result) {
       console.log(favoriteData)
     }
   })


}
 else if ($(this).hasClass("btn-outline-danger")) {
   $.ajax({
     method: "DELETE",
     url: `/api/favorites/${favoriteData.eventId}`,
     headers: {
       withCredentials: true,
     },
     data: favoriteData.eventId,
     success: function(result) {
       console.log(result, "deleted from favorites")
     }
   })
    // $(this).parent().parent().removeattr('style')
   console.log("OH MA GAWD: ", favorites)
   // $(this).parent().parent().empty()
 };
})


//
// const renderFavorites = function () {
//   console.log("clicked")
//     $("#cardy").hide()
//     $.ajax({
//       method: "GET",
//       url: `/api/favorites`,
//       headers: {
//         withCredentials: true,
//       },
//       success : function(result) {
//         console.log("FOUND DATA:" ,result); // result is an object which is created from the returned JSON
//       },
//       error: function(err) {
//         console.log(err)
//       }
//     })
//     // $("#favoritesDiv").append(favorites)
// }

$("#eventsTab").on("click", function() {

  $("#favoritesDiv").hide(); $("#cardy").show()

});




$("#favorites").on("click", function() {
  console.log("clicked")
    $("#cardy").hide()
    $.ajax({
      method: "GET",
      url: `/api/favorites`,
      headers: {
        withCredentials: true,
      },
      success : function(result) {
        console.log("FOUND DATA:" ,result); // result is an object which is created from the returned JSON

        result.forEach(element =>
          $("#favoritesDiv").append(
           `<div class="card text-white bg-dark mt-1">
              <div class="card-header" id="${element.eventId}"><button type="button" class="heart btn btn-outline-danger"><i class="far fa-heart"></button></i> ${element.eventName}</div>
                <img src="https://i.ibb.co/gFYbrhP/joseph-barrientos-Ji-G7-Bu1-Mo-M-unsplash.jpg" class="card-img-top" alt="...">
                  <div class="card-body">
                    <p class="card-title" id="genre">${element.genre}</p>
                    <p class="card-text" id="distance">Distance:<br>${element.distance}miles</p>
                  <button type="button" class="expanded expand btn btn-secondary btn-lg btn-block">Expand</button>
                </div>
              </div>`)
        )
      },
      error: function(err) {
        console.log(err)
      }
    })
    // $("#favoritesDiv").append(favorites)
});

// renderExpanded =

$("#cardy").on("click", '.expand', function() {

  if ($(this).hasClass("expanded")) {
    $(this).parent().parent().css({"color": "red", "border": "2px solid blue", "width": "46vw", "height": "auto", "position": "absolute", "z-index": "1"})
    $(this).text("Minimize")
    $(this).parent().parent().siblings().hide()
    $(this).removeClass("expanded")
  }
  else {
    console.log("lol")
    $(this).parent().parent().removeAttr(' Style ');
    $(this).text("Expand")
    $(this).addClass("expanded")
    $(this).parent().parent().siblings().show()
  }
  // else {
  //     console.log("lol")
  //     $(this).parent().parent().siblings().remove()
  //     $(this).parent().parent().addClass("expanded")
  //     $(this).text("Minimize")
  // }


})



$( document ).ready(function() {
  if(localStorage.getItem('loggedIn')){
    initMap();
  } else {
    window.location = '/';
  }

});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.78, lng: -122.44},
    zoom: 13.5,
    zoomControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    styles: [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121"
      }
    ]
  },
  {
   elementType: "labels.icon",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#757575"
     }
   ]
 },
 {
   elementType: "labels.text.stroke",
   stylers: [
     {
       color: "#212121"
     }
   ]
 },
 {
   featureType: "administrative",
   elementType: "geometry",
   stylers: [
     {
       color: "#757575"
     }
   ]
 },
 {
   featureType: "administrative.country",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#9e9e9e"
     }
   ]
 },
 {
   featureType: "administrative.land_parcel",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "administrative.locality",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#bdbdbd"
     }
   ]
 },
 {
   featureType: "administrative.neighborhood",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "administrative.neighborhood",
   elementType: "geometry.fill",
   stylers: [
     {
       color: "#229987"
     }
   ]
 },
 {
   featureType: "administrative.neighborhood",
   elementType: "geometry.stroke",
   stylers: [
     {
       color: "#fafff5"
     }
   ]
 },
 {
   featureType: "poi",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#757575"
     }
   ]
 },
 {
   featureType: "poi.park",
   elementType: "geometry",
   stylers: [
     {
       color: "#181818"
     }
   ]
 },
 {
   featureType: "poi.park",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#616161"
     }
   ]
 },
 {
   featureType: "poi.park",
   elementType: "labels.text.stroke",
   stylers: [
     {
       color: "#1b1b1b"
     }
   ]
 },
 {
   featureType: "road",
   elementType: "geometry.fill",
   stylers: [
     {
       color: "#2c2c2c"
     }
   ]
 },
 {
   featureType: "road",
   elementType: "labels",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "road",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#8a8a8a"
     }
   ]
 },
 {
   featureType: "road.arterial",
   elementType: "geometry",
   stylers: [
     {
       color: "#373737"
     }
   ]
 },
 {
   featureType: "road.arterial",
   elementType: "labels",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "road.highway",
   elementType: "geometry",
   stylers: [
     {
       color: "#3c3c3c"
     }
   ]
 },
 {
   featureType: "road.highway",
   elementType: "labels",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "road.highway.controlled_access",
   elementType: "geometry",
   stylers: [
     {
       color: "#4e4e4e"
     }
   ]
 },
 {
   featureType: "road.local",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "road.local",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#616161"
     }
   ]
 },
 {
   featureType: "transit",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#757575"
     }
   ]
 },
 {
   featureType: "water",
   elementType: "geometry",
   stylers: [
     {
       color: "#000000"
     }
   ]
 },
 {
   featureType: "water",
   elementType: "labels.text",
   stylers: [
     {
       visibility: "off"
     }
   ]
 },
 {
   featureType: "water",
   elementType: "labels.text.fill",
   stylers: [
     {
       color: "#3d3d3d"
     }
   ]
 }
    ],
  });
  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      const userLocation = Geohash.encode(pos.lat, pos.lng, 9);
      console.log(userLocation);

      $.ajax({
        method: "GET",
        // https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=GjZeJXAWtkoaocEqKaSOie2GxLzRCBVZ
        url: `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${userLocation}&size=20&sort=distance,asc&apikey=nIqXELlTRG3dtZ9cmpqSl3Poa8Epf5zS`,
        // contentType: "application/json",
        // dataType: 'json',
        async: true,
        success: onSuccess,
        error: function(err) {
          console.log(err);
        }
      });

      infoWindow.setPosition(pos);
      infoWindow.setContent('You Are Here!');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

// FILTERS --> EVENT LISTENERS
$('#filter1').on('click', (event) => {
  $('.card-columns').empty();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const userLocation = Geohash.encode(pos.lat, pos.lng, 9);
      $.ajax({
        method: "GET",
        // https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=GjZeJXAWtkoaocEqKaSOie2GxLzRCBVZ
        url: `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${userLocation}&size=100&sort=distance,asc&apikey=nIqXELlTRG3dtZ9cmpqSl3Poa8Epf5zS`,
        // contentType: "application/json",
       // dataType: 'json',
        async: true,
        success: filter1Success,
        error: function(err) {
          console.log(err);
        }
      });
    });
  };
});
function filter1Success(response) {
  console.log('success')
  response._embedded.events.forEach((event) => {
    if (event.distance < 0.5)
    console.log(event.name)
    console.log(event.distance)
    const name = event.name;
    const id = event.id;
    const distance = event.distance;
    const image = event.images[0].url;
    const segment = event.classifications[0].segment.name;
    const genre = event.classifications[0].genre.name;
    $('.card-columns').append(`
      <div class="card text-white bg-dark mt-1">
        <div class="card-header" id="${id}"><button type="button" class="heart btn btn-outline-danger"><i class="far fa-heart"></button></i> ${name}</div>
        <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-title" id="genre">${segment}/${genre}</p>
            <p class="card-text" id="distance">Distance:<br>${distance}miles</p>
          <button type="button" class="expanded expand btn btn-secondary btn-lg btn-block">Expand</button>
          </div>
      </div>
      `)
  });
};
$('#filter2').on('click', () => {
  // console.log('clicked!')
  $('.card-columns').empty();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const userLocation = Geohash.encode(pos.lat, pos.lng, 9);
      $.ajax({
        method: "GET",
        // https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=GjZeJXAWtkoaocEqKaSOie2GxLzRCBVZ
        url: `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${userLocation}&size=100&sort=distance,asc&apikey=nIqXELlTRG3dtZ9cmpqSl3Poa8Epf5zS`,
        // contentType: "application/json",
        // dataType: 'json',
        async: true,
        success: filter2Success,
        error: function (err) {
          console.log(err);
        }
      });
    });
  };
});
function filter2Success(response) {
  response._embedded.events.forEach((event) => {
    if (event.dates.start.localDate < '2020-02-15') {
      const name = event.name;
      const id = event.id;
      const distance = event.distance;
      const image = event.images[0].url;
      const segment = event.classifications[0].segment.name;
      const genre = event.classifications[0].genre.name;
      $('.card-columns').append(`
        <div class="card text-white bg-dark mt-1">
          <div class="card-header" id="${id}"><button type="button" class="heart btn btn-outline-danger"><i class="far fa-heart"></button></i> ${name}</div>
          <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-title" id="genre">${segment}/${genre}</p>
              <p class="card-text" id="distance">Distance:<br>${distance}miles</p>
            <button type="button" class="expanded expand btn btn-secondary btn-lg btn-block">Expand</button>
            </div>
        </div>
      `)
    }
  })
};
$('#filter3').on('click', () => {
  // console.log('clicked!')
  $('.card-columns').empty();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const userLocation = Geohash.encode(pos.lat, pos.lng, 9);
      $.ajax({
        method: "GET",
        // https://app.ticketmaster.com/discovery/v2/events.json?keyword=devjam&source=universe&countryCode=US&apikey=GjZeJXAWtkoaocEqKaSOie2GxLzRCBVZ
        url: `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${userLocation}&size=100&sort=distance,asc&apikey=nIqXELlTRG3dtZ9cmpqSl3Poa8Epf5zS`,
        // contentType: "application/json",
        // dataType: 'json',
        async: true,
        success: filter3Success,
        error: function (err) {
          console.log(err);
        }
      });
    });
  };
});

function filter3Success(response) {
  const events = response._embedded.events;
  // console.log(events);
  let filter = [];
  // filter always require a return
  const modified = response._embedded.events.filter((event) => {
    if (!filter.includes(event.name)) {
      // console.log(event.name);
      console.log({filter});
      filter.push(event.name);
      return event;
    }
  });
  console.log({modified})
  modified.forEach((event) => {
    const name = event.name;
    const id = event.id;
    const distance = event.distance;
    const image = event.images[0].url;
    const segment = event.classifications[0].segment.name;
    const genre = event.classifications[0].genre.name;
    $('.card-columns').append(`
      <div class="card text-white bg-dark mt-1">
        <div class="card-header" id="${id}"><button type="button" class="heart btn btn-outline-danger"><i class="far fa-heart"></button></i> ${name}</div>
        <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <p class="card-title" id="genre">${segment}/${genre}</p>
            <p class="card-text" id="distance">Distance:<br>${distance}miles</p>
          <button type="button" class="expanded expand btn btn-secondary btn-lg btn-block">Expand</button>
          </div>
      </div>
      `)
  })
}

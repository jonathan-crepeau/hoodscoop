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
          <div class="card-header"><button type="button" class="heart btn btn-outline-danger"><i class="far fa-heart"></button></i>${name}</div>
          <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <p class="card-title">${segment}/${genre}</p>
              <p class="card-text">Distance:<br>${distance}miles</p>
            <button type="button" class="expand btn btn-secondary btn-lg btn-block">Expand</button>
            </div>
        </div>
      `)
    }); // result is an object which is created from the returned JSON
  } catch (err) {
    console.log(err);
  }
};


const favoriteSuccess = async (response) => {
    try {
      const name = event.name;
      const distance = event.distance;
      const id = event.id;
    }
    catch (err){}
}


const faveButton = $('.heart');
const expandButton = $('.expand')

const favorites = [];

const addToFavorites = () => {
  // discuss with johnathan
  // get these values from the header of the card or directly from pin




  const name = document.getElementById('');
  const id = document.getElementById('');

  const favoriteData = {
      eventName: name.value,
      eventId: id.value,
  };

  $.ajax({
    method: "POST",
    url: '/api/favorites/:id',
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(favoriteData),
    success : function(result) {
      console.log(result); // result is an object which is created from the returned JSON
    }
  })

}

// faveButton.on("click", addToFavorites)

$("#cardy").on("click", '.heart', function() {
   $(this).toggleClass("btn-outline-danger").toggleClass("btn-danger")
   if ($(this).hasClass("btn-danger")) {
     $(this).parent().parent().css({"color": "red", "border": "2px solid red"});
     favorites.push($(this).parent().parent())
   }
   else if ($(this).hasClass("btn-outline-danger")) {
     favorites.splice(favorites.indexOf($(this).parent().parent()), 1)
     console.log("OH MA GAWD: ", favorites)
     $(this).parent().parent().empty()
   }
 })

const renderFavorites = function () {
    $("#cardy").hide()
    console.log(favorites);
    $("#favoritesDiv").append(favorites)
}

$("#eventsTab").on("click", function() {$("#favoritesDiv").hide(); $("#cardy").show()})


$("#favorites").on("click", renderFavorites)

// renderExpanded =

$("#cardy").on("click", '.expand', function() {

  if (!$(this).hasClass("expanded")) {
    $(this).addClass("expanded")
    $(this).parent().parent().css({"color": "red", "border": "2px solid blue", "width": "46vw", "position": "absolute", "z-index": "1"})
    $(this).text("Minimize")
    $(this).parent().parent().siblings().hide()
  }
  else {
    console.log("lol")
    $(this).parent().parent().removeAttr(' Style ');
    $(this).text("Expand")
    $(this).removeClass("expanded")
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
      infoWindow.setContent('Location found.');
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
    const distance = event.distance;
    const image = event.images[0].url;
    const segment = event.classifications[0].segment.name;
    const genre = event.classifications[0].genre.name;
    $('.card-columns').append(`
        <div class="card text-white bg-dark mt-1" style="max-width: 25rem;">
          <div class="card-header"><button type="button" class="redBtn btn-outline-danger"><i class="far fa-heart"></button></i></div>
          <img src="${image}" class="card-img-top" id="imgID"alt="...">
            <div class="card-body">
              <p class="smallText font-weight-bold">${name}</p>
              <p class=smallText>${segment}/${genre}</p>
              <p class="smallText card-text">Distance:<br>${distance}miles</p>
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
      const distance = event.distance;
      const image = event.images[0].url;
      const segment = event.classifications[0].segment.name;
      const genre = event.classifications[0].genre.name;
      $('.card-columns').append(`
        <div class="card text-white bg-dark mt-1" style="max-width: 25rem;">
          <div class="card-header"><button type="button" class="redBtn btn-outline-danger"><i class="far fa-heart"></button></i></div>
          <img src="${image}" class="card-img-top" id="imgID"alt="...">
            <div class="card-body">
              <p class="smallText font-weight-bold">${name}</p>
              <p class=smallText>${segment}/${genre}</p>
              <p class="smallText card-text">Distance:<br>${distance}miles</p>
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
    const distance = event.distance;
    const image = event.images[0].url;
    const segment = event.classifications[0].segment.name;
    const genre = event.classifications[0].genre.name;
    $('.card-columns').append(`
        <div class="card text-white bg-dark mt-1" style="max-width: 25rem;">
          <div class="card-header"><button type="button" class="redBtn btn-outline-danger"><i class="far fa-heart"></button></i></div>
          <img src="${image}" class="card-img-top" id="imgID"alt="...">
            <div class="card-body">
              <p class="smallText font-weight-bold">${name}</p>
              <p class=smallText>${segment}/${genre}</p>
              <p class="smallText card-text">Distance:<br>${distance}miles</p>
            </div>
          </div>
      `)
  })
}

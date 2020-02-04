const icon = {
  url: ('./images/pin-icon-png-11-transparent.png'),
  scaledSize: new google.maps.Size(40,40),
  origin: new google.maps.Point(0,0), // origin
  anchor: new google.maps.Point(0, 0)
};

const onSuccess = (response) => {
    response._embedded.events.forEach((event) => {
      console.log(event._embedded.venues[0].city)
      const lng = JSON.parse(event._embedded.venues[0].location.longitude)
      const lat = JSON.parse(event._embedded.venues[0].location.latitude)
      const location = {lng: lng, lat:lat}


      const eqPin = new google.maps.Marker({position: location, map: map, icon: icon, animation:google.maps.Animation.BOUNCE}); //, icon: icon

      var infowindow = new google.maps.InfoWindow({
        content: `<h2>lolol</h2>`
      });

      eqPin.addListener('click', function() {
        infowindow.open(map, eqPin);
      });
    }); // result is an object which is created from the returned JSON
};

const faveButton = $('.btn');

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

faveButton.on("click", addToFavorites)


$( document ).ready(function() {
  initMap();

    $('#toasty').toast('show');
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
        url: `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${userLocation}&sort=distance,asc&apikey=nIqXELlTRG3dtZ9cmpqSl3Poa8Epf5zS`,
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

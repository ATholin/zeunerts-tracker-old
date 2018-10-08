import axios from "axios";

export let userlocation = {};

const apiGeolocationSuccess = function(position) {
  console.log(
    "API geolocation success!\n\nlat = " +
      position.coords.latitude +
      "\nlng = " +
      position.coords.longitude
  );
  userlocation = {
    ...position.coords
  };
};

export const tryAPIGeolocation = function() {
  axios
    .post(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
        process.env.GEO_KEY
    )
    .then(res => {
      console.log(res.data.location.lat);
      apiGeolocationSuccess({
        position: {
          coords: {
            latitude: res.data.location.lat,
            longitude: res.data.location.lng
          }
        }
      });
    })
    .catch(error => {
      console.log("API Geolocation error! \n\n" + error);
    });
};

const browserGeolocationSuccess = function(position) {
  userlocation = {
    ...position.coords
  };
};

const browserGeolocationFail = function(error) {
  switch (error.code) {
    case error.TIMEOUT:
      alert("Browser geolocation error !\n\nTimeout.");
      break;
    case error.PERMISSION_DENIED:
      if (error.message.indexOf("Only secure origins are allowed") === 0) {
        tryAPIGeolocation();
      }
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Browser geolocation error !\n\nPosition unavailable.");
      break;
    default:
      break;
  }
};

export const tryGeolocation = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      browserGeolocationSuccess,
      browserGeolocationFail,
      { maximumAge: 50000, timeout: 20000, enableHighAccuracy: true }
    );
  }
};

// CALCULATE DISTANCE

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
};

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

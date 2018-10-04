import axios from "../axios-places";
require("dotenv").config();

export let userlocation = {};

const apiGeolocationSuccess = function(position) {
  alert(
    "API geolocation success!\n\nlat = " +
      position.coords.latitude +
      "\nlng = " +
      position.coords.longitude
  );
};

const tryAPIGeolocation = function() {
  axios
    .get(
      "https://www.googleapis.com/geolocation/v1/geolocate?key=" +
        process.env.MAPS_API
    )
    .then(res => {
      apiGeolocationSuccess({
        coords: {
          latitude: res.data.location.lat,
          longitude: res.data.location.lng
        }
      });
    })
    .catch(error => {
      alert("API Geolocation error! \n\n" + error);
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

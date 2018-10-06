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

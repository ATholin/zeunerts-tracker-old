const express = require("express");
const router = express.Router();
require("dotenv").config();

const googleMapsClient = require("@google/maps").createClient({
  key: process.env.MAPS_API,
  Promise: Promise
});

// Item Model
const Place = require("../../models/Place");

// @route   GET api/places
// @desc    Get all places
// @access  Public
router.get("/", (req, res) => {
  Place.find()
    .sort({
      date: -1
    })
    .then(items => res.json(items))
    .catch(err => {
      res.status(404).json({
        error: "Could not get places"
      });
    });
});

// @route   GET api/places
// @desc    Get specific place
// @access  Public
router.get("/:id", (req, res) => {
  Place.findById(req.params.id)
    .then(place => {
      res.json(place);
    })
    .catch(err => {
      res.status(404).json({
        error: "Could not get place"
      });
    });
});

// @route   POST api/places
// @desc    Create A Place
// @access  Public
router.post("/", (req, res) => {
  const date = new Date();
  if (req.body.price && req.body.address) {
    if (req.body.price > 200) {
      res.status(500).json({
        error: "Price is too high."
      });
    }
    googleMapsClient
      .geocode({
        address: req.body.address
      })
      .asPromise()
      .then(geoRes => {
        if (geoRes.json.results.length) {
          googleMapsClient
            .place({
              placeid: geoRes.json.results[0].place_id
            })
            .asPromise()
            .then(placeRes => {
              const place = placeRes.json.result;
              const isBottle = req.body.price < 30
              const parsedPlace = {
                date: date,
                name: place.name,
                address: `${place.address_components[1].short_name} ${
                  place.address_components[0].short_name
                }, ${place.address_components[3].short_name}`,
                street: geoRes.json.results[0].address_components[1].long_name,
                city: geoRes.json.results[0].address_components[3].long_name,
                _id: place.place_id,
                price: req.body.price,
                julmust: req.body.julmust,
                bottle: isBottle,
                location: new Array(
                  place.geometry.location.lat,
                  place.geometry.location.lng
                )
              };
              console.log(place.geometry.location.lat);

              Place.findById(place.place_id)
                .then(dbplace => {
                  if (dbplace) {
                    dbplace.history.push({
                      price: parsedPlace.price,
                      julmust: parsedPlace.julmust,
                      date: parsedPlace.date,
                      bottle: isBottle
                    });
                    dbplace.price = parsedPlace.price;
                    dbplace.date = parsedPlace.date;
                    dbplace.bottle = isBottle;
                    dbplace
                      .save()
                      .then(dbplace => res.status(200).json(dbplace));
                  } else {
                    const newItem = new Place({
                      ...parsedPlace,
                      history: {
                        price: req.body.price,
                        julmust: req.body.julmust,
                        date: date
                      }
                    });
                    newItem
                      .save()
                      .then(savedPlace => res.status(200).json(savedPlace));
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: "Error getting place details. Please try again later."
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
        res
          .status(500)
          .json({
            error: "Error geocoding address. Please try again later."
          });
      });
  } else {
    res
      .status(400)
      .json({
        error: "Could not parse place with incomplete fields"
      });
  }
});

module.exports = router;
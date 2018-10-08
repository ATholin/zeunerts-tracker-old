const express = require("express");
const router = express.Router();
const getDistance = require("../../util/geolocate");
// Item Model
const Place = require("../../models/Place");

// @route   GET api/near
// @desc    Get all places in a 100km range of the selected coordinates.
// @access  Public
router.post("/", (req, res) => {
  let r = req.body.radius;
  let nearby = [];
  let location;
  Place.findById(req.body._id)
    .then(place => {
      location = place.location;

      Place.find()
        .then(places => {
          //  if(x - x0) ^ (2 + (y - y0)) ^ (2 < r) ^ 2;
          places.forEach(dbplace => {
            if (place._id !== dbplace._id) {
              if (
                Math.round(
                  getDistance(
                    location[0],
                    location[1],
                    dbplace.location[0],
                    dbplace.location[1]
                  )
                ) < 100
              ) {
                nearby.push(dbplace);
              }
            }
          });

          if (nearby.length) {
            res.json({ ...nearby });
          } else {
            res.status(404).json({ Error: "No results found" });
          }
        })
        .catch(err => res.status(500).json({ Error: "Could not find places" }));
    })
    .catch(err =>
      res.status(500).json({ Error: "Could not find a place with that ID" })
    );
});

module.exports = router;

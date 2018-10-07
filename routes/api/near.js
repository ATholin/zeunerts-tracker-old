const express = require("express");
const router = express.Router();

// Item Model
const Place = require("../../models/Place");

// @route   GET api/near
// @desc    Get all places in a 100km range of the selected coordinates.
// @access  Public
router.post("/", (req, res) => {
  let r = req.body.radius;
  let nearby = [];
  let location;
  console.log(req);
  Place.findById(req.body.id)
    .then(place => {
      Place.find()
        .then(places => {
          //  if(x - x0) ^ (2 + (y - y0)) ^ (2 < r) ^ 2;
          places.forEach(dbplace => {
            if (
              Math.pow(dbplace.location[0] - location[0], 2) +
                Math.pow(dbplace.location[1] - location[1], 2) <
              Math.pow(r, 2)
            ) {
              nearby.push(dbplace);
              console.log("close");
            }
          });

          if (nearby.length) {
            res.json({ nearby });
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

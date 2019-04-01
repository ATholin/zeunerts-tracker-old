const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PlaceSchema = new Schema({
  _id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  julmust: {
    type: Boolean,
    required: true
  },
  bottle: {
    type: Boolean,
    required: true
  },
  history: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  location: {
    type: [Number]
  }
});

module.exports = Place = mongoose.model("place", PlaceSchema);
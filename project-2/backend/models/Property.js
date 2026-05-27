const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  price: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  bedrooms: {
    type: Number,
    required: true
  },

  bathrooms: {
    type: Number,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  }

});

module.exports =
  mongoose.model(
    "Property",
    PropertySchema
  );
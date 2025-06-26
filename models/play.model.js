const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let playSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    max: 50,
    trim: true,
  },
  year: { 
    type: String, 
    required: [true, 'Year is required'];
     trim: true,
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    max: 20
  },
  cast: {
    type: String,
    required: [ true, 'Cast is required']
  },
  duration: {
    type: String,
    required: [ true, 'Duration is required'],
    max: 3
  }
});

module.exports = mongoose.model("Play", playSchema);
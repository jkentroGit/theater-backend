const mongoose = require("mongoose");
const Play = require('./play.model');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  seatNumber: { type: String, required: true },
  status: { type: String, enum: ['AVAILABLE', 'SELECTED', 'BOOKED'], default: 'AVAILABLE' }
});

const rowSchema = new Schema({
  seats: [seatSchema]
});

const showSchema = new Schema({
   playId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Play', 
    required: true 
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  showDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rows: [rowSchema],

}, {
  collection: 'shows',
  timestamps: true
});

module.exports = mongoose.model("Show", showSchema);
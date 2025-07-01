const mongoose = require("mongoose");
const Play = require('../models/play.model');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  label: { type: String, required: true },
  status: { type: String, enum: ['AVAILABLE', 'RESERVED', 'BOOKED'], default: 'AVAILABLE' }
});

const rowSchema = new Schema({
  seats: [seatSchema]
});

const hallSchema = new Schema({
   playId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Play', 
    required: true 
  },
  daysOfWeek: {
    type: [String],
    enum: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'],
    required: true
  },
  time: {
    type: String,
    match: [/^\d{2}:\d{2}$/, 'Time must be in HH:mm format'],
    required: [true, 'Time is required']
  },
  showDate: {
    type: Date,
    required: true
  },
  rows: [rowSchema],

}, {
  collection: 'halls',
  timestamps: true
});

module.exports = mongoose.model("Hall", hallSchema);
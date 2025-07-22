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
    required: [true, 'Η παράσταση πρέπει να συσχετιστεί με κάποιο έργο (playId)']
  },
  time: {
    type: String,
    required: [true, 'Η ώρα της παράστασης είναι υποχρεωτική']
  },
  showDate: {
    type: Date,
    required: [true, 'Η ημερομηνία της παράστασης είναι υποχρεωτική']
  },
  price: {
    type: Number,
    required: [true, 'Η τιμή εισιτηρίου είναι υποχρεωτική']
  },
  rows: [rowSchema]
}, {
  collection: 'shows',
  timestamps: true
});

module.exports = mongoose.model("Show", showSchema);
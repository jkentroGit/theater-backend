const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let playSchema = new Schema({
  code: {
    type: String,
    required: [true, 'Ο κωδικός είναι υποχρεωτικός'],
    maxlength: [10, 'Ο κωδικός δεν μπορεί να ξεπερνά τους 10 χαρακτήρες']
  },
  title: {
    type: String,
    required: [true, 'Ο τίτλος είναι υποχρεωτικός'],
    maxlength: [50, 'Ο τίτλος δεν μπορεί να ξεπερνά τους 50 χαρακτήρες'],
    trim: true
  },
  year: { 
    type: String, 
    required: [true, 'Το έτος είναι υποχρεωτικό'],
    trim: true
  },
  director: {
    type: String,
    required: [true, 'Ο σκηνοθέτης είναι υποχρεωτικός'],
    maxlength: [30, 'Το όνομα σκηνοθέτη δεν μπορεί να ξεπερνά τους 30 χαρακτήρες']
  },
  cast: {
    type: String,
    required: [true, 'Το καστ είναι υποχρεωτικό']
  },
  duration: {
    type: String,
    required: [true, 'Η διάρκεια είναι υποχρεωτική'],
    maxlength: [3, 'Η διάρκεια δεν μπορεί να ξεπερνά τους 3 χαρακτήρες']
  },
  images: {
    type: [String]
  }
}, {
  collection: 'plays',
  timestamps: true
});

module.exports = mongoose.model("Play", playSchema);
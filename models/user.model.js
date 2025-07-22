const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let addressSchema = new Schema({
  city: { type: String,
     required: [true, 'Το όνομα της πόλης είναι υποχρεωτικό']
   },
  street: { type: String,
     required: [true, 'Το όνομα της οδού είναι υποχρεωτικό']
   },
  streetNum: { type: String,
     required: [true, 'Ο αριθμός είναι υποχρεωτικός']
   },
  tk: { type: String,
     required: [true, 'Ο ΤΚ είναι υποχρεωτικός']
   }
}, {_id: false});

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Το όνομα χρήστη είναι υποχρεωτικό'],
    maxlength: [20, 'Το όνομα χρήστη δεν μπορεί να ξεπερνά τους 20 χαρακτήρες'],
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Ο κωδικός πρόσβασης είναι υποχρεωτικός'],
    minlength: [8, 'Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον 8 χαρακτήρες']
   
  },
  firstname: {
    type: String,
    required: [true, 'Το όνομα είναι υποχρεωτικό'],
    maxlength: [20, 'Το όνομα δεν μπορεί να ξεπερνά τους 20 χαρακτήρες']
  },
  lastname: {
    type: String,
    required: [true, 'Το επώνυμο είναι υποχρεωτικό'],
    maxlength: [20, 'Το επώνυμο δεν μπορεί να ξεπερνά τους 20 χαρακτήρες']
  },
  email: {
    type: String,
    required: [true, 'Το email είναι υποχρεωτικό'],
    unique: true,
    trim: true,
    lowercase: true
  },
  address: addressSchema,
  mobile: {
    type: String,
    required: [true, 'Το κινητό τηλέφωνο είναι υποχρεωτικό'],
    maxlength: [20, 'Το κινητό δεν μπορεί να ξεπερνά τους 20 χαρακτήρες']
  },
  role: {
    type: String,
    enum: {
      values: ['ADMIN', 'USER'],
      message: 'Ο ρόλος πρέπει να είναι ADMIN ή USER'
    },
    default: 'USER',
    // required: [true, 'Ο ρόλος είναι υποχρεωτικός']
  }
}, {
  collection: 'users',
  timestamps: true
});

module.exports = mongoose.model("User", userSchema)
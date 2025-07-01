const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let addressSchema = new Schema({
  prefecture: { type: String },
  road: { type: String },
  number: { type: String },
  tk: { type: String }
}, {_id: false});

let phoneSchema = new Schema({
  type: {type: String},
  number: {type: String}
}, {_id: false});

let userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    max: 20,
    unique: [true, 'Username is used my another user'],
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    min: [8, 'Password must be at least 8 digits'],
    max:20
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    max: 20
  },
  surname: {
    type: String,
    required: [ true, 'Surname is required'],
    max: 20
  },
  email: {
    type: String,
    required: [ true, 'Email is required'],
    max: 20,
    unique: [true, 'Email is used my another user'],
    trim: true,
    lowercase: true
  },
  address: addressSchema,
  phone: { type: [phoneSchema], null: true},
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
    required: true
  }
},
{
  collection: 'users',
  timestamps: true
});

module.exports = mongoose.model("User", userSchema)
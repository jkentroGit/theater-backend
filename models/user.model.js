const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let addressSchema = new Schema({
  city: { type: String },
  street: { type: String },
  streetNum: { type: String },
  tk: { type: String }
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
  firstname: {
    type: String,
    required: [true, 'Name is required'],
    max: 20
  },
  lastname: {
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
  mobile: {
    type: String,
    required: [ true, 'Mobile is required'],
    max: 20
  },
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
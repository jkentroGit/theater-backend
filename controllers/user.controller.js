const User = require('../models/user.model');
const userService = require('../services/user.services');
const bcrypt = require('bcrypt');

// const logger = require('../logger/logger');

exports.findAll = async(req, res) => {
  console.log("Find all users from collection users");

  try {
    const result = await userService.findAll();
    res.status(200).json({status: true, data: result});
    // logger.info("Success in reading all users");
    // logger.warn("Success in reading all users");
    // logger.error("Message with error");
  } catch (err) {
    console.log("Problem in reading users", err);
    // logger.error("Problem in reading all users", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOne = async(req,res) => {
  console.log("Find one user");
  let username = req.params.username;
  
  try {
    const result = await userService.findOne(username);
    if (result) {
      req.status(200).json({status:true, data:result})
    } else {
      req.status(404).json({status:false, data: "User does not exist"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data: err});
  }
  }

exports.create = async(req, res) => {
  console.log("Create User");
  let data = req.body;
  const SaltOrRounds = 10;
  
  let hashedPassword = "";
  if (data.password)
    hashedPassword = await bcrypt.hash(data.password, SaltOrRounds)
   
  const newUser = new User({
    username: data.username,
    password: hashedPassword,
    name: data.name,
    surname: data.surname,
    email: data.email,
    address: {
      prefecture: data.address.prefecture,
      road: data.address.road,
      number: data.address.number,
      tk: data.address.tk
    },
    phone: {
      type: data.phone.type,
      number: data.phone.number
    } 
  });

  try{
    const result = await newUser.save();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in creating user", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.update = async(req, res) => {
  console.log("Update User");
  const username = req.body.username;
     
  const updatedUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: {
      prefecture: req.body.address.prefecture,
      road: req.body.address.road,
      number:req.body.address.number,
      tk: req.body.address.tk
    },
    phone: {
      type: req.body.phone.type,
      number:req.body.phone.number
    } 
  };

  try{
    const result = await User.findOneAndUpdate({username: username}, updatedUser, {new:true});
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in updating user", err);
    res.status(400).json({status: false, data: err});
  }
}
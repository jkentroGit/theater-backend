const User = require('../models/user.model');
const bcrypt = require('bcrypt');


exports.findAll = async(req, res) => {
  console.log("Find all users from collection users");

  try {
    const result = await User.find();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading users", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOneByUsername = async(req,res) => {
  
  const username = req.params.username;
  
  try {
    const result = await User.findOne({username});
    if (result) {
      res.status(200).json({status:true, data:result})
    } else {
      res.status(404).json({status:false, data: "User does not exist"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
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
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    address: {
      city: data.address.city,
      street: data.address.street,
      streetNum: data.address.streetNum,
      tk: data.address.tk
    },
    mobile: data.mobile,
    role: data.role
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
  const username = req.body.username;
  s
  console.log("Update User");
     
  const updatedUser = {
    firstname: req.body.name,
    lastname : req.body.lastname,
    email : req.body.email,
    address : {
      city : req.body.address.city,
      street : req.body.address.street,
      streetNum  :req.body.address.streetNum,
      tk : req.body.address.tk
    },
    mobile : req.body.mobile
    };

  try{
    const result = await User.findOneAndUpdate({username: username}, updatedUser, {new:true});
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in updating user", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.deleteByUsername = async(req,res) => {
  console.log("Delete user");
  const username = req.params.username;

  try {
    if(await User.findOne({username})) {
    const result = await User.findOneAndDelete({username: username});
    res.status(200).json({status: true, data: result});
    } else {
      res.status(400).json({status: false, data: "User does not exist"});
    } 
  } catch (err) {
    console.log("Problem in deleting user", err);
    res.status(400).json({status: false, data: err});
  }
}

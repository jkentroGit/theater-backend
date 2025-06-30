const Play = require('../models/play.model');
// const bcrypt = require('bcrypt');


exports.findAll = async(req, res) => {
  console.log("Find all plays from collection plays");

  try {
    const result = await Play.find();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading plays", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOne = async(req,res) => {
  
  const code = req.params.code;
  
  try {
    const result = await User.findOne({code});
    if (result) {
      res.status(200).json({status:true, data:result})
    } else {
      res.status(404).json({status:false, data: "Play does not exist"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
  }
  }

exports.create = async(req, res) => {
  console.log("Create Play");
  let data = req.body;
   
  const newPlay = new Play({
    code: data.code,
    title: data.title,
    year: data.year,
    director: data.director,
    cast: data.cast,
    duration: data.duration
  });

  try{
    const result = await newPlay.save();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in creating play", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.update = async(req, res) => {
  const code = req.body.code;
  let data = req.body;
  
  console.log("Update Play");
     
  const updatedPlay = {
    code: data.code,
    title: data.title,
    year: data.year,
    director: data.director,
    cast: data.cast,
    duration: data.duration
  };

  try{
    const result = await Play.findOneAndUpdate({code: code}, updatedPlay, {new:true});
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in updating play", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.deleteByCode = async(req,res) => {
  console.log("Delete play");
  const code = req.params.code;

  try {
    if(await Play.findOne({code})) {
    const result = await Play.findOneAndDelete({code: code});
    res.status(200).json({status: true, data: result});
    } else {
      res.status(400).json({status: false, data: "Play does not exist"});
    } 
  } catch (err) {
    console.log("Problem in deleting play", err);
    res.status(400).json({status: false, data: err});
  }
}

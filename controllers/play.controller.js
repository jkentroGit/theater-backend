const Play = require('../models/play.model');

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


exports.findOneById = async(req,res) => {
  
  const id = req.params.id;
  
  try {
    const result = await Play.findById(id);
    if (result) {
      res.status(200).json({status:true, data:result})
    } else {
      res.status(404).json({status:false, data: "Play does not exist"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
  }
  }

exports.findOneByCode = async(req,res) => {
  
  const code = req.params.code;
  
  try {
    const result = await Play.findOne({code : code});
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

  const code = req.params.code;

  try {
    const deleted = await Play.findOneAndDelete({ code });
   
    res.status(200).json({ status: true, data: deleted });
  } catch (err) {
    console.error('Error deleting play:', err);
    res.status(400).json({ status: false, message: 'Error deleting play', error: err });
  }
}

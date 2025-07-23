const Play = require('../models/play.model');

exports.findAll = async(req, res) => {
  
  try {
    const result = await Play.find();
    res.status(200).json({status: true, data: result});
    console.log("Επιτυχημένη εύρεση όλων των έργων");
  } catch (err) {
    console.log("Πρόβλημα στην εύρεση των έργων", err);
    res.status(400).json({status:false, data: err});
  }
}


exports.findOneById = async(req,res) => {
  
  const id = req.params.id;
  
  try {
    const result = await Play.findById(id);
    if (result) {
      res.status(200).json({status:true, data:result})
      console.log("Το έργο βρέθηκε");
    } else {
      res.status(404).json({status:false, data: "Το έργο δεν υπάρχει"})
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
      console.log("Το έργο βρέθηκε");
    } else {
      res.status(404).json({status:false, data: "Το έργο δεν υπάρχει"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
  }
  }

exports.create = async(req, res) => {
  
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
    console.log("Δημιουργία νέου έργου");
  } catch (err) {
    console.log("Πρόβλημα στη δημιουργία έργου", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.update = async(req, res) => {
  const code = req.body.code;
  let data = req.body;  
     
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
    console.log("Επεξεργασία έργου επιτυχημένη");
  } catch (err) {  
    res.status(400).json({status: false, data: err});
    console.log("Πρόβλημα στην επεξεργασία έργου", err);
  }
}

exports.deleteByCode = async(req,res) => {

  const code = req.params.code;

  try {
    const deleted = await Play.findOneAndDelete({ code });   
    res.status(200).json({ status: true, data: deleted });
    console.log("Διαγραφή έργου επιτυχημένη");
  } catch (err) {
    console.error("Πρόβλημα στη διαγραφή έργου", err);
    res.status(400).json({ status: false, error: err });
  }
}

const mongoose = require('mongoose');
const Show = require('../models/show.model');
const Play = require('../models/play.model');


exports.findAll = async(req, res) => {
  console.log("Find all shows");

  try {
    const result = await Show.find();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading shows", err);
    res.status(400).json({status:false, data: err});
  }
}


exports.findOne = async(req,res) => {
  
  const id = req.params.id;
  
  try {
    const result = await Show.findById(id);
    if (result) {
      res.status(200).json({status:true, data:result})
    } else {
      res.status(404).json({status:false, data: "Show does not exist"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
  }
  }


exports.create = async (req,res) => {
  console.log("Create new show show");
  let data = req.body;

  const rows = [];
  for (let rowNum = 1; rowNum <= 10; rowNum++) {
    const seats = [];
    for (let seatNum = 1; seatNum <= 20; seatNum++) {
      seats.push({
        label: `${rowNum}-${seatNum}`,  // e.g., "1-1", "1-2", ..., "10-20"
        status: 'AVAILABLE'
      });
    }
    rows.push({ seats });
  }

  const show = new Show({
    playId: data.playId,
    daysOfWeek: data.daysOfWeek,
    time: data.time,
    showDate: new Date(data.showDate),
    rows
  });

  await show.save();
  console.log('Show created with ID:', show._id);
}

exports.update = async (req, res) => {
  const showId = req.params.id;
  const { seatsToUpdate } = req.body;

  try {
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ status: false, data: 'Show not found' });
    }

    seatsToUpdate.forEach(({ label, status }) => {
      show.rows.forEach(row => {
        const seat = row.seats.find(seat => seat.label === label);
        if (seat) {
          seat.status = status;
        }
      });
    });

    await show.save();
    res.status(200).json({ status: true, data: show });
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
  }
};

exports.deleteById = async(req,res) => {
  console.log("Delete show");
  const id = req.params.id;

  try {
    if(await Show.findById(id)) {
    const result = await Show.findOneAndDelete(id);
    res.status(200).json({status: true, data: result});    
    } else {
      res.status(400).json({status: false, data: "show does not exist"});
    } 
  } catch (err) {
    console.log("Problem in deleting show", err);
    res.status(400).json({status: false, data: err});
  }
}
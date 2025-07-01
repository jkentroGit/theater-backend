const mongoose = require('mongoose');
const Hall = require('../models/hall.model');
const Play = require('../models/play.model');


exports.findAll = async(req, res) => {
  console.log("Find all halls");

  try {
    const result = await Hall.find();
    res.status(200).json({status: true, data: result});
  } catch (err) {
    console.log("Problem in reading halls", err);
    res.status(400).json({status:false, data: err});
  }
}


exports.create = async (req,res) => {
  console.log("Create new show hall");
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

  const hall = new Hall({
    playId: data.playId,
    daysOfWeek: data.daysOfWeek,
    time: data.time,
    showDate: new Date(data.showDate),
    rows
  });

  await hall.save();
  console.log('Hall created with ID:', hall._id);
}
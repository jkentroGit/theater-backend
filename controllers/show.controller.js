const mongoose = require('mongoose');
const Show = require('../models/show.model');
const Play = require('../models/play.model');


exports.findAll = async(req, res) => {

  try {
    const result = await Show.find();
    res.status(200).json({status: true, data: result});    
    console.log("Εύρεση όλων των παραστάσεων");
  } catch (err) {
    console.log("Πρόβλημα στην εύρεση παραστάσεων", err);
    res.status(400).json({status:false, data: err});
  }
}


exports.findOneById = async(req,res) => {
  
  const id = req.params.id;
  
  try {
    const result = await Show.findById(id);
    if (result) {
      res.status(200).json({status:true, data:result})
      console.log("Εύρεση παράστασης επιτυχημένη");
    } else {
      res.status(404).json({status:false, data: "Το έργο δεν υπάρχει"})
      
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
    console.log("Εύρεση παράστασης επιτυχημένη");
  }
  }


exports.create = async (req, res) => {
  try {

    const data = req.body;

    const rows = [];
    for (let rowNum = 1; rowNum <= 10; rowNum++) {
      const seats = [];
      for (let seatNum = 1; seatNum <= 20; seatNum++) {
        seats.push({
          seatNumber: `${rowNum}-${seatNum}`,
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
      price: data.price,
      rows
    });

    await show.save();
    console.log("Δημιουργήθηκε νέα παράσταση");
    res.status(201).json({ message: "Η παράσταση δημιουργήθηκε", show });

  } catch (error) {
    console.error("Σφάλμα κατά τη δημιουργία παράστασης:", error);
    res.status(500).json({ message: "Σφάλμα", error: error.message });
  }
};

exports.update = async (req, res) => {

  const showId = req.params.id;
  const { seatsToUpdate } = req.body;

  try {
    const show = await Show.findById(showId);
    if (!show) {
      return res.status(404).json({ status: false, data: 'Η παράσταση δεν βρέθηκε' });
    }

    seatsToUpdate.forEach(({ label, status }) => {
      show.rows.forEach(row => {
        const seat = row.seats.find(seat => seat.seatNumber === label);
        if (seat) {
          seat.status = status;
        }
      });
    });

    await show.save();
    res.status(200).json({ status: true, data: show });
    console.log("Επιτυχημένη επεξεργασία παράστασης");
  } catch (error) {
    res.status(500).json({ status: false, data: error.message });
    console.log("Αποτυχημένη επεξεργασία παράστασης");
  }
};

exports.deleteById = async(req,res) => {
 
  const id = req.params.id;

  try {
    
    if(await Show.findById(id)) {
    const result = await Show.findOneAndDelete({ _id: id });
    res.status(200).json({status: true, data: result});   
    console.log("Επιτυχημένη διαγραφή παράστασης"); 
    } else {
      res.status(400).json({status: false, data: "Η παράσταση δεν υπάρχει"});
    } 
  } catch (err) {
    console.log("Αποτυχημένη διαγραφή παράστασης", err);
    res.status(400).json({status: false, data: err});
  }
}

exports.deleteByPlayId = async (req, res) => {
  const playId = req.params.playId;

 try {
    const result = await Show.deleteMany({playId});
    res.status(200).json({ status: true, data: result});
    console.log("Επιτυχημένη διαγραφή όλων των παραστάσεων του έργου");
  } catch (err) {
    res.status(500).json({ status: false, error: err });
    console.log("Αποτυχημένη διαγραφή όλων παραστάσεων του έργου");
  }
};
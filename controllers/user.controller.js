const User = require('../models/user.model');
const bcrypt = require('bcrypt');


exports.findAll = async(req, res) => {

  try {
    const result = await User.find();
    res.status(200).json({status: true, data: result});
    console.log("Εύρεση όλων των χρηστών");
  } catch (err) {
    console.log("Πρόβλημα στην εύρεση χρήστη", err);
    res.status(400).json({status:false, data: err});
  }
}

exports.findOneByUsername = async(req,res) => {
  
  const username = req.params.username;
  
  try {
    const result = await User.findOne({username});
    if (result) {
      res.status(200).json({status:true, data:result})
      console.log("Επιτυχημένη εύρεση χρήστη");
    } else {
      res.status(404).json({status:false, data: "Ο χρήστης δεν υπάρχει"})
    } 
  } catch (err) {
    res.status(400).json({status:false, data:err});
    console.log("Πρόβλημα στην εύρεση χρήστη");
  }
  }

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const saltOrRounds = 10;

    let hashedPassword = "";
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    }

    const newUser = new User({
      username: data.username,
      password: hashedPassword,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      address: {
        city: data.address?.city,
        street: data.address?.street,
        streetNum: data.address?.streetNum,
        tk: data.address?.tk
      },
      mobile: data.mobile,
      role: data.role
    });

    const result = await newUser.save();
    console.log("Ο χρήστης δημιουργήθηκε");
    res.status(201).json({ status: true, data: result });

  } catch (err) {
    console.log("Πρόβλημα κατά τη δημιουργία χρήστη");
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const username = req.body.username;

    const updatedUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      address: {
        city: req.body.address?.city,
        street: req.body.address?.street,
        streetNum: req.body.address?.streetNum,
        tk: req.body.address?.tk
      },
      mobile: req.body.mobile
    };

    const result = await User.findOneAndUpdate(
      { username: username },
      updatedUser,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ status: false, message: "Ο χρήστης δεν βρέθηκε" });
    }

    res.status(200).json({ status: true, data: result });
    console.log("Επιτυχημένη επεξεργασία χρήστη");

  } catch (err) {
    console.log("Πρόβλημα κατά την επεξεργασία χρήστη");
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.deleteByUsername = async(req,res) => {

  const username = req.params.username;

  try {
    if(await User.findOne({username})) {
    const result = await User.findOneAndDelete({username: username});
    res.status(200).json({status: true, data: result});
    console.log("Επιτυχημένη διαγραφή χρήστη");
    } else {
      res.status(400).json({status: false, data: "Ο χρήστης δεν βρέθηκε"});
    } 
  } catch (err) {
    console.log("Πρόβλημα στη διαγραφή χρήστη", err);
    res.status(400).json({status: false, data: err});
  }
}

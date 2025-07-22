const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const authService = require('../services/auth.service');

exports.login = async(req, res) =>{

  const username = req.body.username;
  const password = req.body.password;
  
  try {
    const result = await User.findOne({username: username},{username:1, email:1, password:1, role:1})
    const isMatch = await bcrypt.compare(password, result.password);
   
    if (result.username === username && isMatch){
      const token = authService.generateAccessToken(result)
      res.status(200).json({status: true, data: token});
    } else {
      res.status(404).json({status: false, data: "Πρόβλημα με το username ή το password"});
    }
  } catch (err) {
    console.log("Πρόβλημα με την σύνδεση", err);
    res.status(400).json({status: false, data: err})
  }
};
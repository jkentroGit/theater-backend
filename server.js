// const mongoose = require("mongoose");
// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;


// require('dotenv').config(); // if you need env variables
const mongoose = require("mongoose");
const app = require("./app"); // Import the configured Express app
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
.then (
    () => {
      console.log("Επιτυχημένη σύνδεση με την MongoDB");
      
      app.listen(port, ()=>{
        console.log("Επιτυχημένη σύνδεση με server")
      })
    },
    err => { console.log('Αποτυχία σύνδεσης με την MongoDB', err); }
  )
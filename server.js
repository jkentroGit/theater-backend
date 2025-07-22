const mongoose = require("mongoose");
const app = require('./app');
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
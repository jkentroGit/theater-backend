const mongoose = require("mongoose");
const Play = require('./Play');
const Schema = mongoose.Schema;

const seatSchema = new Schema({
  label: { type: String, required: true },
  status: { type: String, enum: ['available', 'reserved', 'booked'], default: 'available' }
});

const rowSchema = new Schema({
  seats: [seatSchema]
});

const hallSchema = new Schema({
   playId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Play', 
    required: true 
  },
  rows: [rowSchema]
}, {
  collection: 'halls',
  timestamps: true
});

module.exports = mongoose.model("Hall", hallSchema);


// const mongoose = require('mongoose');
// const Hall = require('./Hall');
// const Play = require('./Play');

// async function seedHall() {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/YOUR_DB_NAME');

//     // Create a play (or find an existing one)
//     const play = await Play.create({
//       title: 'King Lear',
//       year: '2024',
//       director: 'Alice Smith',
//       cast: 'Actor X, Actor Y',
//       duration: '130'
//     });

//     const rows = [];

//     for (let rowNum = 1; rowNum <= 10; rowNum++) {
//       const row = { seats: [] };

//       for (let seatNum = 1; seatNum <= 20; seatNum++) {
//         row.seats.push({
//           label: `${seatNum}`,     // Seat label as a number string
//           status: 'available'
//         });
//       }

//       rows.push(row);
//     }

//     const hall = await Hall.create({
//       playId: play._id,
//       rows: rows
//     });

//     console.log('Numeric-labeled Hall created with ID:', hall._id);
//     mongoose.disconnect();
//   } catch (error) {
//     console.error('Error creating hall:', error);
//   }
// }

// seedHall();
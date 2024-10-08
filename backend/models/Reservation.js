const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  property: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  username: { type: String, required: true }, 
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },// Add this field to store the username
  // Other fields...
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;




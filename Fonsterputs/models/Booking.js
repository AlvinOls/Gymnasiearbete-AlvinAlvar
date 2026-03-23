const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  adress: String,
  isConfirmed: { type: Boolean, default: false }
});
module.exports = mongoose.model('Booking', bookingSchema);

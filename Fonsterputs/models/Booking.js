const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  adress: String,
  timeSlot: String,
  isConfirmed: { type: Boolean, default: false }
});
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: Date,
  timeSlot: String,
  isConfirmed: { type: Boolean, default: false }
});

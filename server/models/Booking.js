const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appliance: { type: String, required: true },
  issue: { type: String, required: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  slot: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'], default: 'Pending' },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);

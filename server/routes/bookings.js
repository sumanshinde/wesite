const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { auth, admin } = require('../middleware/auth');

// Create a booking
router.post('/', auth, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id
    });
    await booking.save();
    res.status(201).json({ message: 'Booking successful!', booking });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a guest booking
router.post('/guest', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Guest booking successful!', booking });
  } catch (error) {
    console.error('Guest Booking Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// List all bookings (Admin only)
router.get('/all', auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').sort('-createdAt');
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// List per-user bookings
router.get('/me', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

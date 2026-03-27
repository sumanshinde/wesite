const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: true, credentials: true })); // Relax origin for debug if needed
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Database Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wesite';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB SUCCESS'))
  .catch(err => console.error('MongoDB connection error FAIL:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

// Health check
app.get('/health', (req, res) => res.send('Server is running'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

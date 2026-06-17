const express = require('express');
const mongoose = require('mongoose');
const dns = require('dns');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/segments', require('./routes/segmentRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/highlights', require('./routes/highlightRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

// MongoDB connection + server start
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/infinity_events';

if (mongoUri.startsWith('mongodb+srv://')) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('✅ MongoDB connected');
    const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Stop the other server or set PORT to a free port.`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });
    // Seed initial data
    require('./seed');
  })
  .catch((err) => console.error('MongoDB error:', err));

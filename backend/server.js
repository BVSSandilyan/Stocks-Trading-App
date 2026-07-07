const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware — allow all localhost origins for development
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any localhost port
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    // Allow configured client URL
    const allowed = process.env.CLIENT_URL || 'http://localhost:3000';
    if (origin === allowed) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// MongoDB Atlas Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('No MongoDB URI found in environment variables');
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB Atlas connected successfully');
    console.log(`📦 Database: ${mongoose.connection.db.databaseName}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
});
mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/transactions', require('./routes/transactions'));

// Simple ping — open this in browser to verify backend is alive: http://localhost:5000/api/ping
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString(), message: 'Stocks Trading App backend is alive' });
});

// Health check — shows DB status
app.get('/api/health', (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status: 'OK',
    message: 'Stocks Trading App API is running',
    database: dbState[mongoose.connection.readyState],
    dbName: mongoose.connection.db?.databaseName || 'N/A',
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Stocks Trading App server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
});

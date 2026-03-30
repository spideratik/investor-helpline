require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import routes & middleware
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { protect } = require('./middleware/authMiddleware');
const User = require('./models/User');

const app = express();

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Global middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically (so frontend can display images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route logger (dev only)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: "Server is running!", time: new Date() });
});

// Get logged-in user profile
app.get('/api/auth/user', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Database connection
const dbURI = process.env.MONGO_URI;
if (!dbURI) {
  console.error("❌ ERROR: MONGO_URI is not defined in your .env file!");
  process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });

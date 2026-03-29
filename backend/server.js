require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. IMPORT ROUTES & MIDDLEWARE
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const { protect } = require('./middleware/authMiddleware'); 
const User = require('./models/User');

const app = express();

// 2. GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json()); // Essential for reading req.body

// 3. DEBUGGING: Route Logger (Helps find 404 errors)
app.use((req, res, next) => {
    console.log(`${req.method} request to: ${req.url}`);
    next();
});

// 4. API ROUTES
// These prefixes mean your URL must start with /api/auth or /api/projects
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// 5. MANUAL ROUTES (Health Checks)
app.get('/api/health', (req, res) => {
    res.json({ status: "Server is running!", time: new Date() });
});

// Protected User Profile Route
app.get('/api/auth/user', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// 6. DATABASE CONNECTION
const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("❌ ERROR: MONGO_URI is not defined in your .env file!");
    process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Successfully connected to MongoDB Atlas");
    
    // 7. START SERVER (Only after DB is connected)
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📝 Testing Signup at: http://localhost:${PORT}/api/auth/signup`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err.message);
  });
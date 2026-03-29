const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER ROUTE
router.post('/register', async (req, res) => {
    try {
        // 1. Destructure including 'role' (Crucial for Developer Mode)
        const { name, email, password, role } = req.body;

        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists with this email" });
        }

        // 3. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Save User with the selected role (defaults to 'investor' if not provided)
        user = new User({ 
            name, 
            email, 
            password: hashedPassword,
            role: role || 'investor' 
        });
        
        await user.save();

        // 5. Create JWT Token (Include role in the payload for easier frontend access)
        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(201).json({ 
            token, 
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email,
                role: user.role 
            } 
        });
    } catch (err) {
        // This will print the EXACT database error in your terminal
        console.error("Signup Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
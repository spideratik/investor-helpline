const express = require('express');
const router = express.Router();
// Ensure these names match your exports EXACTLY
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router; // This MUST be like this. No curly braces.
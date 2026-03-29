const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // 1. Get token from the header
    const token = req.header('x-auth-token');

    // 2. Check if no token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add the user ID from the token payload to the request object
        req.user = decoded; 
        next(); // Move to the next function (the actual route)
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
const jwtAuthMiddleware = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = req.headers.authorization.split(' ')[1]; // Expecting "Bearer <token>"
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to request object
        next();

    }catch(error){
        return res.status(401).json({ message: 'Invalid token' });
    }
}
// Function to generate JWT token for a user
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { jwtAuthMiddleware, generateToken };
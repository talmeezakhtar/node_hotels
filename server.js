const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport =  require('./auth');

// Initialize Passport.js
app.use(passport.initialize());

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Our Hotel');
});

const personRoutes = require('./routes/personRoutes');
const menuRouter = require('./routes/menuRoutes');

const LocalAuthMiddleware = passport.authenticate('local', { session: false });
app.use('/person', personRoutes);
app.use('/menu',menuRouter);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

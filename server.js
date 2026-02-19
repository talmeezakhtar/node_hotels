const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

// Middleware
app.use(express.json());

// Route
app.get('/', (req, res) => {
    res.send('Welcome to Our Hotel');
});

const personRoutes = require('./routes/personRoutes');
const menuRouter = require('./routes/menuRoutes');

app.use('/person',personRoutes);
app.use('/menu',menuRouter);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

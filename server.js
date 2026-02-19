const express = require('express');
const app = express();
const db = require('./db');

const PORT = 3000;

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
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

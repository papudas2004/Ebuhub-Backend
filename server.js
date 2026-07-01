require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

// Database connection
require('./dbconnection/dbtest');

// Corrected Route Mounting
const webRoutes = require('./routes/web');
app.use('/api/auth', webRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
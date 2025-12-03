require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// DB Connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/jobs', require('./src/routes/jobRoutes'));
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/jobs', require('./src/routes/jobRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
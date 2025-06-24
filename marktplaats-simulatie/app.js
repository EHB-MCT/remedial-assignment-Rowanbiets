const express = require('express');
const connectMongo = require('./database/connectMongo');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect database
connectMongo();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);
});

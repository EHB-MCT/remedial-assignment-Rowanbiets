const express = require('express');
const cors = require('cors');
const connectMongo = require('./database/connectMongo');
const runMarketSimulation = require('./services/simulationService');
require('dotenv').config();

const app = express(); 

app.use(cors());      
app.use(express.json());

const marketRoutes = require('./routes/marketRoutes');
app.use('/api', marketRoutes);

// Connect database
connectMongo();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);

  // Start simulatie loop
  // setInterval(runMarketSimulation, 60 * 1000); // elke minuut
});

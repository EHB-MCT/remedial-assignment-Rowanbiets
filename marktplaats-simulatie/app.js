const express = require('express');
const connectMongo = require('./database/connectMongo');
const runMarketSimulation = require('./services/simulationService');
require('dotenv').config();

const app = express();  // <-- app maken vóór gebruik

const marketRoutes = require('./routes/marketRoutes');

// Middleware
app.use(express.json());

// Routes gebruiken
app.use('/api', marketRoutes);

// Connect database
connectMongo();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server draait op http://localhost:${PORT}`);

  // Start simulatie loop (elke 60 sec)
//setInterval(runMarketSimulation, 60 * 1000); // elke minuut

});

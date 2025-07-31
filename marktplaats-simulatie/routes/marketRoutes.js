const express = require('express');
const router = express.Router();
const { getAllResources, buyResource,sellResource } = require('../controllers/marketController');
const runMarketSimulation = require('../services/simulationService');

router.get('/resources', getAllResources);
router.post('/buy', buyResource); 
router.post('/sell', sellResource);
router.post('/simulate', async (req, res) => {
  try {
    await runMarketSimulation();
    res.json({ message: 'Simulatie succesvol uitgevoerd' });
  } catch (err) {
    res.status(500).json({ message: 'Simulatie mislukt', error: err.message });
  }
});


module.exports = router;

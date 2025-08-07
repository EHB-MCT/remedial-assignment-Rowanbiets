const express = require('express');
const router = express.Router();

const {
  getAllResources,
  buyResource,
  sellResource,
} = require('../controllers/marketController');

const runMarketSimulation = require('../services/simulationService');

/**
 * @route   GET /api/resources
 * @desc    Haal alle grondstoffen op
 * @access  Public
 */
router.get('/resources', getAllResources);

/**
 * @route   POST /api/buy
 * @desc    Koop een grondstof
 * @access  Public
 */
router.post('/buy', buyResource);

/**
 * @route   POST /api/sell
 * @desc    Verkoop een grondstof
 * @access  Public
 */
router.post('/sell', sellResource);

/**
 * @route   POST /api/simulate
 * @desc    Voer de marktsimulatie uit
 * @access  Public
 */
router.post('/simulate', async (req, res) => {
  try {
    await runMarketSimulation();
    res.json({ message: 'Simulatie succesvol uitgevoerd' });
  } catch (err) {
    res.status(500).json({ message: 'Simulatie mislukt', error: err.message });
  }
});

module.exports = router;

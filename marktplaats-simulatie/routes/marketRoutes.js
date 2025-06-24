const express = require('express');
const router = express.Router();
const { getAllResources, buyResource } = require('../controllers/marketController');

router.get('/resources', getAllResources);
router.post('/buy', buyResource); // 👈 deze toevoegen


module.exports = router;

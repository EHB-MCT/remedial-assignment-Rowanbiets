const express = require('express');
const router = express.Router();
const { getAllResources, buyResource,sellResource } = require('../controllers/marketController');

router.get('/resources', getAllResources);
router.post('/buy', buyResource); 
router.post('/sell', sellResource);

module.exports = router;

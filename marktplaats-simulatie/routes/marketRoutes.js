const express = require('express');
const router = express.Router();
const { getAllResources } = require('../controllers/marketController');

router.get('/resources', getAllResources);

module.exports = router;

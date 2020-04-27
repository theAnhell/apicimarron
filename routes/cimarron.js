const express = require('express');
const cimarronControl = require('../controllers/cimarron');
const router = express.Router();

router.get('/status/:IDEstatus',cimarronControl.GetStatus);

module.exports = router;

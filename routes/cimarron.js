const express = require('express');
const cimarronControl = require('../controllers/cimarron');
const router = express.Router();

router.get('/status/:IDEstatus', cimarronControl.GetStatus);
router.get('/operadores', cimarronControl.getOperadores);
router.get('/xml/operadores',cimarronControl.getOperadoresXML)

module.exports = router;

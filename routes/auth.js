const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const router = express.Router();

router.post(
  '/login',
  [
    body('id').trim().not().isEmpty(),
    body('password').trim(),
  ],
  authController.login
);

module.exports = router;

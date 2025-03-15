const express = require('express');
const router = express.Router();
const { getUptrend } = require('../controllers/uptrendController');

router.get('/', getUptrend);

module.exports = router;

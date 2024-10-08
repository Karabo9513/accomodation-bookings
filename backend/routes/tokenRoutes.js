const express = require('express');
const { refreshToken } = require('../controllers/tokenController');
const router = express.Router();

// Define the refresh token route
router.post('/refresh', refreshToken);

module.exports = router;
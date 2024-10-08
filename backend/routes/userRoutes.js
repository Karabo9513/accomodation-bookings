const express = require('express');
const { register, login } = require('../controllers/userController'); // Ensure this path is correct
const router = express.Router();

router.post('/register', register);
router.post('/login', login); // Ensure this path matches your fetch request

module.exports = router;

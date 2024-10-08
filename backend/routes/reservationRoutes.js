const express = require('express');
const {
    createReservation,
    getUserReservations,
    getHostReservations,
    deleteReservation
} = require('../controllers/reservationController'); // Ensure the path to your controller is correct
const auth = require('../middleware/auth'); // Import the authentication middleware

const router = express.Router();

// Create a new reservation
router.post('/', auth, createReservation); // Protect this route with auth middleware

// Get reservations for the authenticated user
router.get('/', auth, getUserReservations);

router.get('/host/:id', auth, getHostReservations); // Protect this route with auth middleware

// Delete a reservation by ID
router.delete('/:id', auth, deleteReservation); // Protect this route with auth middleware

module.exports = router;




const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const {
    createAccommodation,
    getAllAccommodations,
    getAccommodationById,
    updateAccommodation,
    deleteAccommodation
} = require('../controllers/accommodationController');


const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Routes

// Create a new accommodation with images
// Use auth middleware to ensure only authenticated hosts can create accommodations
router.post('/', auth, upload.array('images', 10), async (req, res) => {
    try {
        // Pass host_id from the logged-in user to the createAccommodation function
        req.body.host_id = req.user._id; // Set host_id from the authenticated user
        await createAccommodation(req, res);
    } catch (error) {
        console.error('Error in POST /accommodations:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Get all accommodations or filter by location using query string
router.get('/', async (req, res) => {
    try {
        await getAllAccommodations(req, res);
    } catch (error) {
        console.error('Error in GET /accommodations:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Get accommodation by ID
router.get('/:id', async (req, res) => {
    try {
        await getAccommodationById(req, res);
    } catch (error) {
        console.error('Error in GET /accommodations/:id:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Update accommodation by ID and upload new images (if any)
router.put('/:id', auth, upload.array('images', 10), async (req, res) => {
    try {
        await updateAccommodation(req, res);
    } catch (error) {
        console.error('Error in PUT /accommodations/:id:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Delete accommodation by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        await deleteAccommodation(req, res);
    } catch (error) {
        console.error('Error in DELETE /accommodations/:id:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;











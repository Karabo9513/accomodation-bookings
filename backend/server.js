const express = require('express');  
const cors = require('cors');  
const mongoose = require('mongoose');  
const dotenv = require('dotenv');  
const userRoutes = require('./routes/userRoutes');  
const accommodationRoutes = require('./routes/accommodationRoutes');  
const reservationRoutes = require('./routes/reservationRoutes');  
const tokenRoutes = require('./routes/tokenRoutes'); // Import the token routes  
const Accommodation = require('./models/accommodation'); // Import the Accommodation model  
const auth = require('./middleware/auth'); // Import the auth middleware  
const multer = require('multer'); // Import Multer  
const path = require('path');
  
// Load environment variables from .env file  
dotenv.config();  
  
const app = express();  
const port = process.env.PORT || 5000;  
  
// Connect to MongoDB  
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })  
   .then(() => console.log('MongoDB connected'))  
   .catch(err => console.error('Database connection error:', err));  
  
// Middleware  
app.use(cors()); // Enable CORS for all routes  
app.use(express.json()); // Parse JSON request bodies  
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies  
  
// Set up Multer to handle file uploads  
const upload = multer({ dest: 'uploads/' });  
  
// Routes  
app.use('/api/users', userRoutes);  
app.use('/api/accommodations', accommodationRoutes);  
app.use('/api/reservations', auth, reservationRoutes); // Protect reservation routes with auth middleware  
app.use('/api/token', tokenRoutes);  
  
  
// Get accommodations by location  
app.get('/api/accommodations', async (req, res) => {  
    const location = req.query.location;  
    
    // Validate query parameter  
    if (!location) {  
     return res.status(400).json({ message: 'Location is required' });  
    }  
    
    try {  
     const accommodations = await Accommodation.find({ location });  
     res.json(accommodations);  
    } catch (error) {  
     console.error('Error fetching accommodations:', error);  
     res.status(500).json({ message: 'Internal Server Error' });  
    }  
  });  
    
  app.get('/uploads/:filename', (req, res) => {  
    const filename = req.params.filename;  
    if (!filename) {  
     return res.status(404).json({ message: 'File not found' });  
    }  
    const filePath = path.join(__dirname, 'uploads', filename);  
    res.sendFile(filePath);  
  });
  
  app.post('/api/accommodations', upload.array('images', 12), async (req, res) => {  
    const images = req.files;  
    const accommodation = new Accommodation({  
     // ... other fields ...  
     images: images.map(image => image.filename)  
    });  
    try {  
     await accommodation.save();  
     res.json({ message: 'Accommodation created successfully' });  
    } catch (error) {  
     console.error('Error creating accommodation:', error);  
     res.status(500).json({ message: 'Internal Server Error' });  
    }  
  });
// Start server  
app.listen(port, () => {  
   console.log(`Server running on port ${port}`);  
});












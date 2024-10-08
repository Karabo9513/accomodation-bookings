const Accommodation = require('../models/accommodation');
const Host = require('../models/host'); // Ensure you have a Host model

// Get all accommodations without filtering
exports.getAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find().populate('host_id', 'name');
        if (!accommodations || accommodations.length === 0) {
            return res.status(404).json({ message: 'No accommodations found' });
        }
        res.status(200).json(accommodations);
    } catch (error) {
        console.error('Error fetching accommodations:', error);
        res.status(500).json({ message: 'Error fetching accommodations', error: error.message });
    }
};

// Get all accommodations with host names or filter by location
exports.searchAccommodationsByLocation = async (req, res) => {
    const { location } = req.query; // Get location from query parameters
    console.log("Searching for accommodations in location:", location); // Log the search location

    try {
        let accommodations;

        if (!location || location.toLowerCase() === 'all') {
            // Fetch all accommodations if 'all' is selected or no location is provided
            accommodations = await Accommodation.find().populate('host_id', 'name');
        } else {
            // Search accommodations by location for exact match
            accommodations = await Accommodation.find({
                location: location // Exact match
            }).populate('host_id', 'name');
        }

        console.log("Accommodations found:", accommodations); // Log found accommodations

        if (!accommodations || accommodations.length === 0) {
            return res.status(404).json({ message: 'No accommodations found for the given location' });
        }

        res.status(200).json(accommodations);
    } catch (error) {
        console.error('Error searching accommodations:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error searching accommodations', error: error.message });
    }
};



exports.getAccommodationById = async (req, res) => {  
    try {  
     const accommodation = await Accommodation.findById(req.params.id).populate('host_id', ['name', '_id']); // Populate host name and _id  
     console.log('Accommodation object:', accommodation); // Log the accommodation object  
     if (!accommodation) {  
      return res.status(404).json({ message: 'Accommodation not found' });  
     }  
     res.status(200).json(accommodation);  
    } catch (error) {  
     res.status(500).json({ message: 'Error fetching accommodation', error: error.message });  
    }  
  };



exports.createAccommodation = async (req, res) => {  
    const { name, rooms, baths, type, location, description, amenities, price, guests } = req.body;  
    const host_id = req.user.id.toString(); // Set host_id to the ID of the logged-in user  
    
    // Validate required fields  
    if (!name || !rooms || !baths || !type || !location || !description || !price || !guests) {  
     return res.status(400).json({ message: 'Missing required fields' });  
    }  
    
    try {  
     // Create a new accommodation  
     const newAccommodation = new Accommodation({  
      name,  
      rooms,  
      baths,  
      type,  
      location,  
      description,  
      amenities: amenities.split(',').map(amenity => amenity.trim()), // Convert comma-separated amenities  
      price,  
      guests,  
      host_id, // Set host_id to the ID of the logged-in user  
      images: req.files ? req.files.map(file => file.path) : [], // Handle file uploads for images  
     });  
    
     await newAccommodation.save();  
     return res.status(201).json(newAccommodation);  
    } catch (error) {  
     console.error('Error creating accommodation:', error);  
     return res.status(500).json({ message: 'Failed to create accommodation' });  
    }  
  };


// Update an accommodation
exports.updateAccommodation = async (req, res) => {
    const { id } = req.params;
    const updatedData = { ...req.body };

    if (req.files) {
        updatedData.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    try {
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(200).json(updatedAccommodation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating accommodation', error: error.message });
    }
};

// Delete an accommodation
exports.deleteAccommodation = async (req, res) => {
    try {
        const deletedAccommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.status(204).send(); // No content on successful delete
    } catch (error) {
        res.status(500).json({ message: 'Error deleting accommodation', error: error.message });
    }
};





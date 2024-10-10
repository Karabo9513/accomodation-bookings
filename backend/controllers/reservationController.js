const Reservation = require('../models/Reservation');  
const User = require('../models/User'); // Import the User model to fetch usernames  
  
exports.createReservation = async (req, res) => {  
  console.log('Request body:', req.body);  
  const { accommodation, checkIn, checkOut } = req.body;  
  const username = req.user.username;  
  const hostId = req.body.accommodation.hostId;  
  
  try {  
   const reservation = await Reservation.create({  
    property: accommodation,  
    checkIn,  
    checkOut,  
    username,  
    hostId,  
   });  
   console.log('Reservation created:', reservation);  
   res.status(201).json(reservation);  
  } catch (error) {  
   console.error('Error creating reservation:', error);  
   console.log('Error message:', error.message);  
   res.status(500).json({ message: 'Failed to create reservation' });  
  }  
};
// Get all reservations for a specific user  
exports.getUserReservations = async (req, res) => {  
  const username = req.user.username; // Use authenticated user's username  
  
  try {  
   const reservations = await Reservation.find({ username: username });  
   return res.status(200).json(reservations);  
  } catch (error) {  
   console.error("Error fetching reservations:", error);  
   return res.status(500).json({ message: 'Error fetching reservations' });  
  }  
};  
exports.getHostReservations = async (req, res) => {  
    console.log('getHostReservations function called');  
    const hostId = req.user._id;  
    
    try {  
     const reservations = await Reservation.find({ hostId: hostId });  
     console.log('Reservations:', reservations);  
     return res.status(200).json(reservations);  
    } catch (error) {  
     console.error("Error fetching reservations:", error);  
     return res.status(500).json({ message: 'Error fetching reservations' });  
    }  
  };
// Delete a specific reservation  
exports.deleteReservation = async (req, res) => {  
  const { id } = req.params;  
  
  try {  
   const deletedReservation = await Reservation.findByIdAndDelete(id);  
  
   if (!deletedReservation) {  
    return res.status(404).json({ message: 'Reservation not found' });  
   }  
  
   return res.status(204).send(); // Successfully deleted  
  } catch (error) {  
   console.error("Error deleting reservation:", error);  
   return res.status(500).json({ message: 'Error deleting reservation' });  
  }  
};





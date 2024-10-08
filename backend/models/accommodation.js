const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rooms: { type: Number, required: true },
    baths: { type: Number, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    amenities: [String],
    images: [String],
    price: { type: Number, required: true }, // Ensure price is a number
    guests: { type: Number, required: true }, // Ensure guests is a number
    host_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference the User model, not Host
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);
module.exports = Accommodation;



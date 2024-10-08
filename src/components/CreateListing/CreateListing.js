import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Adjust the import path as necessary
import './CreateListing.css';

const CreateListing = () => {
  const { user } = useContext(UserContext); // Get user context
  const [formData, setFormData] = useState({
    name: '',
    rooms: '',
    baths: '',
    type: '',
    location: '',
    description: '',
    amenities: '',
    images: [],
    price: '',
    guests: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const listing = location.state?.listing;

  useEffect(() => {
    if (listing) {
      setFormData({
        name: listing.name,
        rooms: listing.rooms,
        baths: listing.baths,
        type: listing.type,
        location: listing.location,
        description: listing.description,
        amenities: listing.amenities.join(', '),
        images: listing.images,
        price: listing.price || '',
        guests: listing.guests || ''
      });
    }
  }, [listing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();

    for (const key in formData) {
      if (key === 'images') {
        formData.images.forEach((file) => {
          formDataToSubmit.append('images', file);
        });
      } else if (key === 'amenities') {
        const amenitiesArray = formData.amenities.split(',').map((amenity) => amenity.trim());
        formDataToSubmit.append('amenities', JSON.stringify(amenitiesArray));
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    }

    // Log FormData to check if price and guests are being appended correctly
    for (let pair of formDataToSubmit.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`); // Check 'price' and 'guests' here
    }

    try {
      // Use accessToken from user context
      const accessToken = user.accessToken; // Ensure this matches how you're storing it

      const headers = {  
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,  
        'Content-Type': 'multipart/form-data'
      };

      if (listing) {
        // Update existing listing
        await axios.put(`http://localhost:5000/api/accommodations/${listing._id}`, formDataToSubmit, {
          headers,
        });
        setSuccessMessage('Listing updated successfully!');
      } else {
        // Create new listing
        await axios.post('http://localhost:5000/api/accommodations', formDataToSubmit, {
          headers,
        });
        setSuccessMessage('Listing created successfully!');
      }
      setErrorMessage('');
      navigate('/admin/listing'); // Redirect to the listing page
    } catch (error) {
      console.error('Error saving listing:', error);
      setErrorMessage('Failed to save listing. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="create-listing-container">
      <h2>{listing ? 'Update Listing' : 'Create Listing'}</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group-row">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter listing name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Rooms</label>
            <input type="number" name="rooms" placeholder="Rooms" value={formData.rooms} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Baths</label>
            <input type="number" name="baths" placeholder="Baths" value={formData.baths} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} required>
              <option value="">Select type</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="studio">Studio</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" placeholder="Enter description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Amenities</label>
          <input type="text" name="amenities" placeholder="Enter amenities (comma separated)" value={formData.amenities} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" name="price" placeholder="Enter price" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Guests</label>
          <input type="number" name="guests" placeholder="Enter number of guests" value={formData.guests} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Images</label>
          <input type="file" multiple onChange={handleFileChange} required />
        </div>

        <div className="form-buttons">
          <button type="submit" className="create-btn">{listing ? 'Update' : 'Create'}</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/admin/listing')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;






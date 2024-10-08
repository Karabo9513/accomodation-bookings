import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LocationPage.css'; // Make sure this path is correct

const LocationPage = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const searchLocation = searchParams.get('location'); // Location from query

  useEffect(() => {
    const fetchListings = async () => {
      console.log('Search Location:', searchLocation); // Debugging line
      try {
        const response = searchLocation
          ? await axios.get(`http://localhost:5000/api/accommodations?location=${searchLocation}`)
          : await axios.get(`http://localhost:5000/api/accommodations`); // Fetch all accommodations if no searchLocation

        console.log('API Response:', response.data); // Log API response for debugging
        
        if (response.data.length === 0) {
          setError(searchLocation ? `No available listings for ${searchLocation}` : 'No accommodations available.');
          setListings([]); // Clear listings if none found
        } else {
          console.log('Setting listings:', response.data);
          setListings(response.data);
          setError(null); // Clear error if successful
        }
      } catch (error) {
        setError('Failed to fetch listings. Please try again later.');
        console.error('Error fetching listings:', error); // Log the error for debugging
      }
    };

    fetchListings();
  }, [searchLocation]);

  return (
    <div className="location-page">
      <h2>Listings in {searchLocation || 'All Locations'}</h2>
      {error && <p>{error}</p>}
      <ul className="listing-list">
        {listings.map((listing) => (
          <li
            key={listing._id}
            className="listing-item"
            onClick={() => navigate(`/location/${listing._id}`)} // Navigate to the LocationDetails page
          >
            {listing.images && listing.images.length > 0 && (
              <img className="listing-image" src={`http://localhost:5000${listing.images[0]}`} alt={listing.name} />
            )}
            <div className="listing-details">
              <h3 className="listing-name">{listing.name}</h3>
              <p className="listing-description">{listing.description}</p>
              <div className="listing-details-text">
                <p>Rooms: {listing.rooms} | Baths: {listing.baths}</p>
              </div>
              <div className="listing-type-location">
                <p>Type: {listing.type}</p>
                <p>Location: {listing.location}</p>
              </div>
              <p className="listing-price">Price: ${listing.price}</p>
            </div>
          </li>
        ))}
        {listings.length === 0 && !error && <p>No listings available.</p>} {/* Optional fallback message */}
      </ul>
    </div>
  );
};

export default LocationPage;






















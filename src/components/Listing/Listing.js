import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  
import './Listing.css';  
  
const Listings = () => {  
  const [listings, setListings] = useState([]);  
  const navigate = useNavigate();  
  
  useEffect(() => {  
    const fetchListings = async () => {  
      try {  
        const response = await axios.get('http://localhost:5000/api/accommodations');  
        setListings(response.data);  
      } catch (error) {  
        console.error('Error fetching listings:', error);  
      }  
    };  
  
    fetchListings();  
  }, []);  
  
  const handleUpdateClick = (listing) => {  
    navigate('/admin/create-listing', { state: { listing } });  
  };  
  
  const handleDeleteClick = async (id) => {  
    try {  
      await axios.delete(`http://localhost:5000/api/accommodations/${id}`);  
      setListings(listings.filter(listing => listing._id !== id));  
    } catch (error) {  
      console.error('Error deleting listing:', error);  
    }  
  };

  const handleListingClick = (id) => {
    navigate(`/location/${id}`); // Navigating to the LocationDetails route
  };
  
  return (  
    <div className="listings-container">  
      <div className="button-container">  
        <button className="button" onClick={() => navigate('/admin/reservations')}>View Reservations</button>  
        <button className="button" onClick={() => navigate('/admin/listing')}>View Listings</button>  
        <button className="button" onClick={() => navigate('/admin/create-listing')}>Create Listing</button>  
      </div>  
  
      <h2 className="hotel-list-heading">My Hotel List</h2> 
      <ul>
  {listings.map((listing) => (
    <li key={listing._id}>
      <div className="listing-item" onClick={() => handleListingClick(listing._id)}>
        <div className="image-gallery">
          {listing.images && listing.images.length > 0 && (
            <img src={`http://localhost:5000${listing.images[0]}`} alt={`Listing image`} />
          )}
        </div>
        <div className="listing-content">
          <h3>{listing.name}</h3>
          <p>{listing.description}</p>
          <p>Rooms: {listing.rooms} | Baths: {listing.baths}</p>
          <p>Type: {listing.type} | Location: {listing.location}</p>
          <p>Amenities: {listing.amenities.join(', ')}</p>
          <p>Price: R{listing.price}</p>
        </div>
      </div>

      {/* Update and Delete Buttons */}
      <div className="button-group">
        <button className="update-button" onClick={(e) => { e.stopPropagation(); handleUpdateClick(listing); }}>Update</button>
        <button className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteClick(listing._id); }}>Delete</button>
      </div>
    </li>
  ))}
</ul>

    </div>  
  );  
};  
  
export default Listings;

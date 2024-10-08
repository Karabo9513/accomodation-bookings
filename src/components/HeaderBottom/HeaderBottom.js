import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './HeaderBottom.css';

const HeaderBottom = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1); // Default to 1 guest

  const handleSearch = () => {
    if (!location) {
      console.log("No location selected");
      return;
    }

    // Navigate to the location page with the selected location
    const redirectUrl = `/location?location=${encodeURIComponent(location)}&checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&guests=${guests}`;
    console.log("Redirecting to:", redirectUrl);
    
    // Perform navigation to the LocationPage
    navigate(redirectUrl);
  };

  return (
    <div className="header-bottom">
      <div className="header-search">
        <div className="search-hotels">
          <label>
            <b>Hotels</b>
            <select onChange={(e) => setLocation(e.target.value)} value={location}>
              <option value="">Select Hotel</option>
              <option value="Cape Town">Cape Town</option>
              <option value="Bordeaux">Bordeaux</option>
              <option value="Pretoria">Pretoria</option>
              {/* Add other specific locations */}
            </select>
          </label>
        </div>
        <div className="search-checkin">
          <label>
            Check-In:
            <input type="date" onChange={(e) => setCheckIn(e.target.value)} value={checkIn} />
          </label>
        </div>
        <div className="search-checkout">
          <label>
            Check-Out:
            <input type="date" onChange={(e) => setCheckOut(e.target.value)} value={checkOut} />
          </label>
        </div>
        <div className="search-guests">
          <label>
            Guests:
            <input type="number" min="1" onChange={(e) => setGuests(e.target.value)} value={guests} />
          </label>
        </div>
        <div className="search-icon" onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;












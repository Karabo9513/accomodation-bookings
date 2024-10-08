import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { jwtDecode } from 'jwt-decode';
import DatePicker from 'react-datepicker'; // Import Datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for Datepicker
import moment from 'moment'; // Import Moment.js
import './LocationDetails.css';
import Bed from '../../assets/images/rect.png';
import Garden from '../../assets/images/icon9.png';
import kitchen from '../../assets/images/Icon4.png';
import Wifi from '../../assets/images/Icon.png'
import Pets from '../../assets/images/Icon5.png'
import Washer from '../../assets/images/Icon1.png'
import Dryer from '../../assets/images/Icon6.png'
import Air from '../../assets/images/Icon2.png'
import Security from '../../assets/images/Icon7.png'
import Joe from '../../assets/images/Avatar1.png'
import Paul from '../../assets/images/Avatar2.png'
import Jose from '../../assets/images/Avatar3.png'
import Bill from '../../assets/images/Avatar4.png'
import Steve from '../../assets/images/Avatar5.png'
import Chris from '../../assets/images/Avatar6.png'
import Base from '../../assets/images/AvatarBase.png'

const LocationDetails = () => {
const { id } = useParams();
const { user } = useContext(UserContext);
const { username } = user;
const [accommodation, setAccommodation] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [checkIn, setCheckIn] = useState('');
const [checkOut, setCheckOut] = useState('');
const [totalPrice, setTotalPrice] = useState(0);
const [startDate, setStartDate] = useState(moment().toDate()); // Default to today's date
const [endDate, setEndDate] = useState(moment().add(1, 'days').toDate()); // Default to tomorrow's date


useEffect(() => {
const fetchAccommodation = async () => {
try {
const response = await axios.get(`http://localhost:5000/api/accommodations/${id}`);
setAccommodation(response.data);
} catch (error) {
console.error('Error fetching accommodation:', error);
setError('Error fetching accommodation details.');
} finally {
setLoading(false);
}
};

fetchAccommodation();
}, [id]);

const calculateTotal = () => {
if (!checkIn || !checkOut || !accommodation) {
console.log('Missing required fields for total calculation:', { checkIn, checkOut, accommodation });
return;
}

const checkInDate = new Date(checkIn);
const checkOutDate = new Date(checkOut);
const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

const nightlyRate = accommodation.price || 0;
const weeklyDiscount = nights >= 7 ? nightlyRate * 0.1 * nights : 0;
const cleaningFee = 50;
const serviceFee = 20;
const occupancyTaxes = 5;

const total = (nightlyRate * nights) - weeklyDiscount + cleaningFee + serviceFee + occupancyTaxes;
setTotalPrice(total);
console.log('Total calculated:', total);
};

const calculateWeeklyDiscount = () => {
if (!checkIn || !checkOut || !accommodation || !accommodation.price) {
console.log('Missing fields for weekly discount calculation:', { checkIn, checkOut, accommodation });
return 0;
}

const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
return nights >= 7 ? (accommodation.price * 0.1 * nights) : 0;
};

const handleReserve = async () => {  
    console.log('Accommodation object:', accommodation);
    console.log('Accommodation object:', accommodation);  
    if (accommodation && accommodation.host_id) {  
     const reservationDetails = {  
      accommodation: accommodation._id,  
      user: username,  
      hostId: accommodation.host_id,
      checkIn,  
      checkOut,  
     };  
     console.log('Reservation details:', reservationDetails); // Log reservation details before making the request  
    
     const token = localStorage.getItem('accessToken'); // Get the access token from local storage  
    
     if (!token) {  
      console.error('No token found. Please log in.');  
      alert('Session expired. Please log in again.');  
      return;  
     }  
    
     const decoded = jwtDecode(token);  
     const currentTime = Date.now() / 1000;  
     if (decoded.exp < currentTime) {  
      console.error('Token has expired. Please log in again.');  
      alert('Session expired. Please log in again.');  
      localStorage.removeItem('token');  
      return;  
     }  
    
     try {  
      const response = await axios.post('http://localhost:5000/api/reservations', reservationDetails, {  
        headers: {  
         Authorization: `Bearer ${token}`, // Include the token in the Authorization header  
        },  
      });  
      console.log('Reservation successful:', response.data);  
      alert('Reservation successful!');  
     } catch (error) {  
      console.error('Error making reservation:', error.response ? error.response.data : error.message);  
      alert('Error making reservation. Please try again.');  
     }  
    } else {  
     console.error('Host is not defined');  
     return;  
    }  
  };

const weeklyDiscount = calculateWeeklyDiscount();
return (
<div className="location-details">
<h1 className="accommodation-name">{accommodation.name}</h1>
<p className="host-info">Hosted by: {accommodation.host ? accommodation.host.username : 'Unknown Host'}</p>
<div className="accommodation-image-gallery">
<img
key={0}
className="main-image"
src={`http://localhost:5000${accommodation.images[0]}`}
alt="Main Image"
/>
<div className="thumbnail-container">
{accommodation.images.slice(1, 3).map((image, index) => (
<img
key={index + 1}
className="thumbnail-image"
src={`http://localhost:5000${image}`}
alt={`Thumbnail ${index + 1}`}
/>
))}
{accommodation.images.slice(3).map((image, index) => (
<img
key={index + 3}
className="thumbnail-image"
src={`http://localhost:5000${image}`}
alt={`Thumbnail ${index + 3}`}
/>
))}
</div>
</div>

<div className="accommodation-header">
    
<p className="host-info">Entire rental unit hosted by Ghazal <i className="fas fa-user"></i></p>
<div className="accommodation-stats">
<p className="guests">2 guests</p>
<p className="bedrooms">1 bedroom</p>
<p className="beds">1 bed</p>
<p className="baths">1 bath</p>
</div>
<div className="accommodation-features">
<div className="feature">
<i className="icon-1"></i>
<span className="feature-name">Entire home</span>
<p className="feature-details">You'll have the apartment to yourself</p>
</div>
<div className="feature">
<i className="icon-2"></i>
<span className="feature-name">Enhanced Clean</span>
<p className="feature-details">This host committedto airbnb 5-step enhanced cleaning process Show more</p>
</div>
<div className="feature">
<i className="icon-3"></i>
<span className="feature-name">Self Check-in</span>
<p className="feature-details">Check yourself in with the keypad</p>
</div>
<div className="feature">
<i className="icon-4"></i>
<span className="feature-name"></span>

</div>
<p className="accommodation-description">Description: {accommodation.description}</p>
<p className="room-bath-info">Rooms: {accommodation.rooms} | Baths: {accommodation.baths}</p>
<p className="type-location-info">Type: {accommodation.type} | Location: {accommodation.location}</p>
<p className="amenities-info">Amenities: {accommodation.amenities.join(', ')}</p>
<p className="price-info">Price: ${accommodation.price} | Guests: {accommodation.guests}</p>

<div classsName="sleep">
    <p className="where">Where you'll sleep</p>
    <img src={Bed} alt="bed-image" /> 
    <p className="Bedroom">Bedroom</p>
    <p className="queen">1 queen beed

    </p>
</div>
<div className="what-this-place-offers">  
  <h3>What this place offers</h3>  
  <div className="amenities-columns">  
   <ul className="left-column">  
   <li><img src={Garden} alt="Garden view" /><i className="fas fa-tree"></i> Garden view </li>
    <li><img src={kitchen} alt="Kitch" /> Kitchen</li>  
    <li><img src={Wifi} alt="wi" />WiFi</li>  
    <li><img src={Pets} alt="petss" />Pets allowed</li>  
   </ul>  
   <ul className="right-column">  
    <li><img src={Washer} alt="washerr" />Washer-in building</li>  
    <li><img src={Dryer} alt="hair" /> Dryer</li>  
    <li><img src={Air} alt="air" />Central air conditioning</li>  
    <li><img src={Security} alt="cam" />Security cameras on property</li>  
   </ul>  
  </div>  
  <p className="amenities">Show all 37 amenities</p>  
</div>
<div className="date-picker-section">  
  <div className="Nights-stay">  
   <h3 className="night">7 nights in Cape Town</h3>  
  </div>  
  <div className="date-picker-container">  
   <DatePicker  
    selected={startDate}  
    onChange={(date) => setStartDate(date)}  
    selectsStart  
    startDate={startDate}  
    endDate={endDate}  
    open // Keep the calendar always open  
    placeholderText="Check-in date"  
    className="date-picker"  
   />  
   <DatePicker  
    selected={endDate}  
    onChange={(date) => setEndDate(date)}  
    selectsEnd  
    startDate={startDate}  
    endDate={endDate}  
    minDate={startDate}  
    open // Keep the calendar always open  
    placeholderText="Check-out date"  
    className="date-picker"  
   />  
  </div>  
</div>

</div>
<div className="Reserve-cal">
<div className="reservation-form">
<div className="price-per-night">  
    <span>$100/night</span>  
   </div> 

<div className="check-in">
<label htmlFor="check-in">Check-in:</label>
<input
type="date"
id="check-in"
value={checkIn}
onChange={(e) => setCheckIn(e.target.value)}
/>
</div>
<div className="check-out">
<label htmlFor="check-out">Check-out:</label>
<input
type="date"
id="check-out"
value={checkOut}
onChange={(e) => setCheckOut(e.target.value)}
/>
</div>
<div className="guest-dropdown">  
    <label htmlFor="guests">Guests:</label>  
    <select id="guests">  
      <option value="1">1</option>  
      <option value="2">2</option>  
      <option value="3">3</option>  
      <option value="4">4</option>  
      <option value="5">5</option>  
    </select>  
   </div>  
</div> 
<div className="total-section">  
   <button className="calculate-total-button" onClick={calculateTotal}>Calculate Total</button> 
   <button className="reserve-button" onClick={handleReserve}>Reserve</button>  
   <p className="note">You won't be charged yet.</p>  
   <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>  
   <p className="weekly-discount">Weekly Discount: ${weeklyDiscount.toFixed(2)}</p>  
   <p className="cleaning-fee">Cleaning Fee: $50</p>  
   <p className="service-fee">Service Fee: $20</p>  
   <p className="occupancy-taxes">Occupancy Taxes: $5</p>  
   <p className="final-total">Total: ${totalPrice.toFixed(2)}</p>  
   
  </div>
    
</div>
</div>





<div className="reviews-section">
  <h3 className="reviews-heading">Reviews</h3>
  <div className="review-summary">
    <span className="review-score">5.0</span>
    <span className="review-count">(7 reviews)</span>
  </div>
  <div className="review-categories">
    <div className="left-column">
      <div className="category">
        <span className="category-title">Cleanliness</span>
        <span className="category-score">5.0</span>
      </div>
      <div className="category">
        <span className="category-title">Communication</span>
        <span className="category-score">5.0</span>
      </div>
      <div className="category">
        <span className="category-title">Check-in</span>
        <span className="category-score">5.0</span>
      </div>
    </div>
    <div className="right-column">
      <div className="category">
        <span className="category-title">Accuracy</span>
        <span className="category-score">5.0</span>
      </div>
      <div className="category">
        <span className="category-title">Location</span>
        <span className="category-score">5.0</span>
      </div>
      <div className="category">
        <span className="category-title">Value</span>
        <span className="category-score">5.0</span>
      </div>
    </div>
  </div>
  <div className="reviews-list">
    <div className="left-column">
      <div className="review-item">
      <img className="review-image" src={Joe} alt="Joes"Joe />
        <span className="reviewer-name">Jose</span>
        <span className="review-date">February 2023</span>
        <p className="review-text">This is a great place to stay! The host is very responsive and the location is perfect.</p>
      </div>
      <div className="review-item">
      <img className="review-image" src={Paul} alt="paul" />
        <span className="reviewer-name">Tshepo</span>
        <span className="review-date">January 2023</span>
        <p className="review-text">The accommodation is clean and comfortable. The neighborhood is quiet and safe.</p>
      </div>
      <div className="review-item">
      <img className="review-image" src={Jose} alt="Joese" />
        <span className="reviewer-name">Dan</span>
        <span className="review-date">December 2022</span>
        <p className="review-text">The amenities are great, and the host is very helpful. I would definitely stay here again.</p>
      </div>
    </div>

    <div className="right-column">
      <div className="review-item">
      <img className="review-image" src={Bill} alt="Joesee" />
        <span className="reviewer-name">Karabo</span>
        <span className="review-date">November 2022</span>
        <p className="review-text">The location is perfect for exploring the city. The accommodation is cozy and comfortable.</p>
      </div>
      <div className="review-item">
      <img className="review-image" src={Steve} alt="don" />
        <span className="reviewer-name">Bontle</span>
        <span className="review-date">October 2022</span>
        <p className="review-text">The host is very friendly and helpful. The accommodation is clean and well-maintained.</p>
      </div>
      <div className="review-item">
      <img className="review-image" src={Chris} alt="Joes" />
        <span className="reviewer-name">Chris</span>
        <span className="review-date">September 2022</span>
        <p className="review-text">This is a great place to stay! The location is perfect, and the host is very responsive.</p>
      </div>
    </div>
  </div>
  
  <button className="show-reviews-button">Show all 12 reviews</button>
</div>
<div className="host-section">
  <h3 className="host-heading">Host</h3>
  
  <div className="host-profile">
    <img className="host-image" src={Base} alt="Ghazal" />
    <div className="host-details">
    <span className="host-name">Hosted by Ghazal</span>
    <span className="host-joined">Joined May 2021</span>
  </div>
  </div>
  <div className="host-info">
    <div className="host-stat">
      <span className="host-reviews">12 Reviews</span>
    </div>
    <div className="host-stat">
      <span className="host-verified">Identity verified</span>
    </div>
    <div className="host-stat">
      <span className="host-superhost">Superhost</span>
    </div>
  </div>
  
  <div className="host-description">
    <p className="host-description-text">Ghazal is a Superhost.</p>
    <p className="host-description-text">
      Superhosts are experienced, highly-rated hosts who are committed to providing great stays for guests.
    </p>
  </div>
  
  <div className="host-response">
    <span className="response-rate">Response rate: 100%</span>
    <span className="response-time">Response time: within an hour</span>
  </div>
  
  <button className="contact-host-button">Contact Host</button>
  <p className="payment-protection">Protect your payment by only communicating through our website or app.</p>
</div>

<div className="things-to-know-section">
  <h2 className="things-to-know-heading">Things to know</h2>

  <div className="things-to-know-content">
    <div className="house-rules-section">
      <h3 className="house-rules-heading">House rules</h3>
      <ul className="house-rules-list">
        <li className="house-rule-item">Check-in: After 4:00 PM</li>
        <li className="house-rule-item">Checkout: 10:00 AM</li>
        <li className="house-rule-item">Self check-in with lockbox</li>
        <li className="house-rule-item">Not suitable for infants (under 2 years)</li>
        <li className="house-rule-item">No smoking</li>
        <li className="house-rule-item">No pets</li>
        <li className="house-rule-item">No parties or events</li>
      </ul>
    </div>

    <div className="health-safety-section">
      <h3 className="health-safety-heading">Health & safety</h3>
      <ul className="health-safety-list">
        <li className="health-safety-item">
          Committed to Airbnb's enhanced cleaning process. <a href="#" className="show-more-link">Show more</a>
        </li>
        <li className="health-safety-item">Airbnb's social-distancing and other COVID-19-related guidelines apply</li>
        <li className="health-safety-item">Carbon monoxide alarm</li>
        <li className="health-safety-item">Smoke alarm</li>
        <li className="health-safety-item">
          Security Deposit - if you damage the home, you may be charged up to $566
        </li>
      </ul>
      <a href="#" className="show-more-link">Show more</a>
    </div>

    <div className="cancellation-policy-section">
      <h3 className="cancellation-policy-heading">Cancellation policy</h3>
      <ul className="cancellation-policy-list">
        <li className="cancellation-policy-item">Free cancellation before February 14</li>
        <li className="cancellation-policy-item">
          <a href="#" className="show-more-link">Show more</a>
        </li>
      </ul>
    </div>
  </div>
</div>


<div className="explore-france">
  <h2 className="explore-heading">Explore other options in France</h2>
  <div className="cities-grid">
    <div className="city-item">
      <span className="city-name">Paris</span>
    </div>
    <div className="city-item">
      <span className="city-name">Nice</span>
    </div>
    <div className="city-item">
      <span className="city-name">Lyon</span>
    </div>
    <div className="city-item">
      <span className="city-name">Marseille</span>
    </div>
    <div className="city-item">
      <span className="city-name">Lille</span>
    </div>
    <div className="city-item">
      <span className="city-name">Aix-en-Provence</span>
    </div>
    <div className="city-item">
      <span className="city-name">Rouen</span>
    </div>
    <div className="city-item">
      <span className="city-name">Amiens</span>
    </div>
    <div className="city-item">
      <span className="city-name">Toulouse</span>
    </div>
    <div className="city-item">
      <span className="city-name">Montpellier</span>
    </div>
    <div className="city-item">
      <span className="city-name">Dijon</span>
    </div>
    <div className="city-item">
      <span className="city-name">Grenoble</span>
    </div>
  </div>

  <div className="unique-stays">
  <h2 className="unique-stays-heading">Unique stays on Airbnb</h2>
    <div className="stays-grid">
      <div className="stay">
        <span>Beach House Rentals</span>
      </div>
      <div className="stay">
        <span>Camper Rentals</span>
      </div>
      <div className="stay">
        <span>Glamping Rentals</span>
      </div>
      <div className="stay">
        <span>Treehouse Rentals</span>
      </div>
      <div className="stay">
        <span>Cabin Rentals</span>
      </div>
      <div className="stay">
        <span>Tiny House Rentals</span>
      </div>
      <div className="stay">
        <span>Lakehouse Rentals</span>
      </div>
      <div className="stay">
        <span>Mountain Chalet Rentals</span>
      </div>
    </div>
  </div>

  <div className="breadcrumb">
    <span>Airbnb</span>
    <span></span>
    <span>Europe</span>
    <span> </span>
    <span>France</span>
    <span></span>
    <span>Bordeaux</span>
  </div>
</div>

<div className="footer">
  <div className="footer-section">
    <div className="footer-support">
      <h2>Support</h2>
      <ul className="info-links">
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Safety information</a></li>
        <li><a href="#">Cancellation options</a></li>
        <li><a href="#">Our COVID-19 response</a></li>
        <li><a href="#">Supporting people with disabilities</a></li>
        <li><a href="#">Report a neighborhood concern</a></li>
      </ul>
    </div>

    <div className="footer-community">
      <h2>Community</h2>
      <ul className="info-links">
        <li><a href="#">Airbnb.org disaster relief housing</a></li>
        <li><a href="#">Support: Afghan refugees</a></li>
        <li><a href="#">Celebrating diversity & belonging</a></li>
        <li><a href="#">Combating discrimination</a></li>
      </ul>
    </div>

    <div className="footer-hosting">
      <h2>Hosting</h2>
      <ul className="info-links">
        <li><a href="#">Try hosting</a></li>
        <li><a href="#">AirCover: protection for Hosts</a></li>
        <li><a href="#">Explore hosting resources</a></li>
        <li><a href="#">Visit our community forum</a></li>
        <li><a href="#">How to host responsibly</a></li>
      </ul>
    </div>

    <div className="footer-about">
      <h2>About</h2>
      <ul className="info-links">
        <li><a href="#">Newsroom</a></li>
        <li><a href="#">Learn about new features</a></li>
        <li><a href="#">Letter from our founders</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Investors</a></li>
        <li><a href="#">Airbnb Luxe</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-rights">
    <div className="footer-terms">
      <p>2022 Airbnb, Inc. Privacy Terms Sitemap</p>
    </div>
    <div className="footer-social-media">
      <span>English (US)</span>
      <span>$ USD</span>
      <span>F</span>
      <span>T</span>
      <span>I</span>
    </div>
  </div>
</div>
</div>
);
};

export default LocationDetails;






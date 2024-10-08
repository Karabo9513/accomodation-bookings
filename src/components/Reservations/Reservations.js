import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; // Adjust the import path as necessary
import './Reservations.css';

const Reservations = () => {

  console.log('Reservations component rendered'); 
  const { user } = useContext(UserContext);
  console.log('User object:', user);// Get user from context
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `http://localhost:5000/api/reservations/host/${user.userID}/host/${user.userID}`;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(API_URL, {
          // Use user ID to fetch reservations
        });
        console.log(response.data);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Error fetching reservations.');
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchReservations();
    }
  }, [user._id]); // Fetch reservations only if user ID is available

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reservation?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setReservations(reservations.filter(reservation => reservation._id !== id));
        alert('Reservation deleted successfully.'); // Consider a toast notification
      } catch (error) {
        console.error('Error deleting reservation:', error);
        alert('Error deleting reservation.');
      }
    }
  };

  if (loading) {
    return <p>Loading reservations...</p>; // Consider adding a loading spinner here
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className="button-container">
        <button onClick={() => navigate('/admin/reservations')}>View Reservations</button>
        <button onClick={() => navigate('/admin/listing')}>View Listings</button>
        <button onClick={() => navigate('/admin/create-listing')}>Create Listing</button>
      </div>
      <h1>My Reservations</h1>
      {reservations.length === 0 && <p>No reservations found.</p>}
      <table>
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Booked By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {reservations.map(reservation => (  
    <tr key={reservation._id}>  
      <td>{reservation.property}</td>  
      <td>{new Date(reservation.checkIn).toLocaleDateString()}</td>  
      <td>{new Date(reservation.checkOut).toLocaleDateString()}</td>  
      <td>{reservation.username}</td> // Display the bookedBy field  
      <td>  
       {new Date(reservation.checkOut) < new Date() ? (  
        <button onClick={() => handleDelete(reservation._id)}>Delete</button>  
       ) : (  
                  <span>Cannot delete future reservations</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;




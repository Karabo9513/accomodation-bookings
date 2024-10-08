import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, UserContext } from './components/contexts/UserContext'; // Import UserProvider and UserContext
import Home from './Home';
import Login from './components/Login/Login';
import LocationPage from './components/LocationPage/LocationPage';
import LocationDetails from './components/LocationDetails/LocationDetails';
import CreateListing from './components/CreateListing/CreateListing';
import Reservations from './components/Reservations/Reservations';
import Listing from './components/Listing/Listing';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import Header from './components/Header/Header';
import Register from './components/Register/Register';

function App() {
    return (
        <UserProvider>
            <Router>
                <div className="App">
                    <HeaderWithUserRole />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        {/* Location routes accessible to everyone */}
                        <Route path="/location" element={<LocationPage />} />
                        <Route path="/location/:id" element={<LocationDetails />} />

                     

                        {/* Host Routes with "/admin" prefix */}
                        <Route 
                            path="/admin/create-listing" 
                            element={
                                <ProtectedRoutes allowedRoles={['host']}>
                                    <CreateListing />
                                </ProtectedRoutes>
                            } 
                        />
                        <Route 
                            path="/admin/reservations" 
                            element={
                                <ProtectedRoutes allowedRoles={['host']}>
                                    <Reservations />
                                </ProtectedRoutes>
                            } 
                        />
                        <Route 
                            path="/admin/listing" 
                            element={
                                <ProtectedRoutes allowedRoles={['host']}>
                                    <Listing />
                                </ProtectedRoutes>
                            } 
                        />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

// A new component to access the userRole from context
function HeaderWithUserRole() {
    const { user } = useContext(UserContext); // Access user context

    // Default to empty string if user is undefined
    const userRole = user.userRole || ''; 

    return (
        <Header userRole={userRole} />
    );
}

export default App;













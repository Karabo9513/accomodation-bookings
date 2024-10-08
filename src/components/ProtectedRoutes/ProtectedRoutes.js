import React, { useContext } from 'react';  
import { Navigate, useLocation } from 'react-router-dom';  
import { UserContext } from '../contexts/UserContext';  
  
const ProtectedRoutes = ({ allowedRoles, children }) => {  
  const { user } = useContext(UserContext);  
  const location = useLocation();  
  
  console.log('User object:', user); // Log the user object  
  
  if (!user) {  
   console.log('User is not authenticated'); // Log if user is not authenticated  
   return <Navigate to="/login" state={{ from: location }} replace />;  
  }  
  
  if (!allowedRoles.includes(user.userRole)) {  
   console.log('User is not authorized'); // Log if user is not authorized  
   return <Navigate to="/unauthorized" state={{ from: location }} replace />;  
  }  
  
  console.log('User is authenticated and authorized'); // Log if user is authenticated and authorized  
  
  return children;  
};  
  
export default ProtectedRoutes;



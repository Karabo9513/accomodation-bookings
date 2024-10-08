import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize user state to indicate no one is logged in
    const [user, setUser] = useState({ username: '', userID: '', userRole: '', _id: '' });

    const login = (username, userID, userRole, _id) => {   
        setUser({ username, userID, userRole, _id: _id });  
        // Uncomment the following line if you want to save the token after login  
        // localStorage.setItem('token', yourToken);  
      };
    // Function to log the user out
    const logout = () => {
        setUser({ username: '', userID: '', userRole: '' });
        localStorage.removeItem('token'); // Clear the token from localStorage
    };

    // Provide user data and login/logout functions to context consumers
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

















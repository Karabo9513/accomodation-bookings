const jwt = require('jsonwebtoken'); // Import the JWT library
const User = require('../models/User'); // Import the User model

const auth = async (req, res, next) => {
    // Get the access token from the authorization header
    const accessToken = req.headers.authorization?.split(' ')[1]; // Split to get the token part
    if (!accessToken) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' }); // If no token, return unauthorized
    }

    try {
        // Verify the access token using the secret
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        
        // Optionally, you can check the role or other data here if necessary
        // const allowedRoles = ['user', 'admin']; // Example of allowed roles
        // if (!decoded.role || !allowedRoles.includes(decoded.role)) {
        //     return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        // }

        // Find the user by ID from the decoded token
        const user = await User.findById(decoded.id); // Find user by ID
       
        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // If no user found, return error
        }

        req.user = { id: user._id, username: user.username }; // Store user ID and username in req.user
        console.log('req.user:', req.user); // Add this line to verify that req.user is being populated correctly  
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("JWT verification error:", err); // Log the error for debugging
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' }); // Specific message for expired token
        }
        return res.status(401).json({ message: 'Unauthorized: Invalid token' }); // Return unauthorized if there's an error
    }
};

module.exports = auth; // Export the middleware for use in routes

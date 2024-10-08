const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model

// Refresh token controller
const refreshToken = async (req, res) => {
    const { token } = req.body; // Get the refresh token from the request body

    if (!token) return res.sendStatus(401); // Unauthorized if no token provided

    try {
        const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); // Verify the refresh token

        // Find the user by ID
        const user = await User.findById(userData.id);
        if (!user) return res.sendStatus(403); // Forbidden if user not found

        // Create a new access token
        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        res.json({ accessToken }); // Send the new access token back to the client
    } catch (error) {
        console.error('Token refresh error:', error);
        return res.sendStatus(403); // Forbidden if token verification fails
    }
};

module.exports = { refreshToken };

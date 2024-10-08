const User = require('../models/User'); // Import User model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken

// Register a new user
exports.register = async (req, res) => {
    const { username, password, role } = req.body;
    console.log('Registration attempt:', req.body); // Keep this for debugging; remove in production.

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        // Generate JWT access token for the new user
        const accessToken = jwt.sign(
            { id: newUser._id, username: newUser.username, role: newUser.role },
            process.env.JWT_SECRET, // Use an environment variable for the secret
            { expiresIn: '1h' }
        );

        // Generate JWT refresh token for the new user
        const refreshToken = jwt.sign(
            { id: newUser._id, username: newUser.username, role: newUser.role },
            process.env.REFRESH_TOKEN_SECRET, // Use an environment variable for the refresh token secret
            { expiresIn: '7d' } // Set the expiration for the refresh token
        );

        // Respond with tokens and user info
        res.status(201).json({ 
            message: 'User registered successfully', 
            accessToken, 
            refreshToken, 
            user: { username: newUser.username, role: newUser.role } 
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login user
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // Check if user exists and passwords match
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT access token
        const accessToken = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET, // Use an environment variable for the secret
            { expiresIn: '1h' }
        );

        // Generate JWT refresh token
        const refreshToken = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.REFRESH_TOKEN_SECRET, // Use an environment variable for the refresh token secret
            { expiresIn: '7d' } // Set the expiration for the refresh token
        );

        // Return tokens and user info
        res.json({ 
            accessToken, 
            refreshToken, 
            user: { username: user.username, role: user.role } 
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};








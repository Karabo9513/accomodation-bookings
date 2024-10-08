import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Ensure this path is correct
import './Login.css';

const Login = () => {
    const { login } = useContext(UserContext); // Use the login function here
    const [usernameInput, setUsernameInput] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameInput, password }),
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (!response.ok) {
                if (data.message === 'Invalid username or password') {
                    setError('Invalid username or password. Would you like to register?');
                    return; // Avoid throwing an error here
                }
                throw new Error(data.message);
            }

            const { accessToken, refreshToken, user } = data;

            // Store the access token and refresh token in localStorage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Use the login function from context
            login(user.username, user._id, user.role); // Change user.id to user._id

            // Also store user details in localStorage for later use
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('username', user.username);

            console.log(`Logged in as ${user.role}:`, user);

            // Preserve search parameters and set redirect path
            const searchParams = new URLSearchParams(location.search);
            const redirectPath = user.role === 'host' ? '/admin/listing' : '/location'; // Change to '/location' to fetch all listings
            console.log(`Attempting to navigate to: ${redirectPath}`);
            navigate(redirectPath); // Navigate to the appropriate path
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>
                {error && (
                    <div>
                        <p className="error-message">{error}</p>
                        <button type="button" onClick={handleRegisterRedirect}>
                            Register
                        </button>
                    </div>
                )}
                <div className="form-group">
                    <button type="submit" className="submit-login" disabled={loading}>
                        {loading ? 'Processing...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;








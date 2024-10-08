import React, { useContext } from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'; // Adjust the path as necessary
import './Header.css';
import BnbWhite from '../../assets/images/Logo.png';
import BnbPink from '../../assets/images/pink.png';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';
  const isHomePage = pathname === '/';
  const { user } = useContext(UserContext); // Destructure user from context

  return (
    <div className={`header ${isLoginPage ? 'header-login' : ''}`}>
      <div className="top-header">
        <img 
          src={isLoginPage ? BnbPink : BnbWhite} 
          alt="Airbnb logo" 
          className={`logo ${isLoginPage ? 'logo-pink' : ''}`} 
        />
        <div className="header-links">
          {isHomePage && (
            <div className="header-text">
              <p>Stays</p>
              <p>Experiences</p>
              <p>Online experiences</p>
            </div>
          )}
          <div className="header-links">
            {user.userRole ? (
              <p>{user.username}</p> // Display username if logged in
            ) : (
              <Link to="/admin/login">Become a host</Link> // Show link if not logged in
            )}
            <LanguageIcon className="language-icon" />
            <div className="profile-menu-icons">
              <MenuIcon className="menu-icon" />
              <Link to="/login">
                <AccountCircleIcon className="account-icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;






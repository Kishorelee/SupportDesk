// Layout.jsx

import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../layout.css'; // Import the CSS file for styling

const Layout = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  console.log(userName);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/');
  };

  const themeStyles = {
    light: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust the opacity as needed
      color: '#000000',
    },
    dark: {
      backgroundColor: 'rgba(42, 41, 41, 0.9)', // Adjust the opacity as needed
      color: '#ffffff',
    },
  };
  

  return (
    <>
      <div style={isDarkTheme ? themeStyles.dark : themeStyles.light}>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="auth-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              {userName !== null ? (
                <Link to="/Ticketmanagement" className="auth-link">
                  TicketManagement
                </Link>
              ) : (
                <Link
                  to="/LoginPage"
                  className="auth-link"
                  onClick={() => navigate('/LoginPage')}
                >
                  TicketManagement
                </Link>
              )}
            </li>
            <li className="nav-item">
              {userName !== null ? (
                <div className="user-info">
                  <span className="welcome-text">Welcome, {userName}!</span>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/SignupPage" className="auth-link">
                    Sign Up
                  </Link>
                  <Link to="/LoginPage" className="auth-link">
                    Login
                  </Link>
                </>
              )}
            </li>
            <li>
            <button onClick={toggleTheme} className="theme-toggle-button">
              {isDarkTheme ? (
                <span role="img" aria-label="Switch to Light Theme">
                  ☀️
                </span>
              ) : (
                <span role="img" aria-label="Switch to Dark Theme">
                  🌙
                </span>
              )}
            </button>
          </li>
          </ul>
        </nav>
      
      <Outlet />
      </div>
    </>
  );
};

export default Layout;

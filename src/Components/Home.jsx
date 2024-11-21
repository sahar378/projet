// src/components/Home.jsx

import React from 'react';
import Navbar from './NavBar'; // Import the Navbar component
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle logout logic
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear the authentication status
    navigate('/'); // Redirect to the login page
  };
  return (
    <div>
      <Navbar /> {/* Add the Navbar here */}
      <h2>Welcome to the Home Page</h2>
      {/* Add any additional content for the Home page here */}
    </div>
  );
};

export default Home;

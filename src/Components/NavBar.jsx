// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: '#fff' }}>
      <ul style={{ listStyleType: 'none', padding: 0, display: 'flex' }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Lougout</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/Pointage" style={{ color: '#fff', textDecoration: 'none' }}>Pointage</Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

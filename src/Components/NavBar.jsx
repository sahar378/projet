import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/log.png'; 
import profile from '../Assets/profile.jpg'; 
import '../Styles/Navbar.css'
const Navbar = ({ userId }) => {
  const handleLogout = () => {
    console.log("Logout clicked!");
    // Add your logout logic here
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
       
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2"
          />
          CheckinPro
        </Link>

       
        <div className="d-flex align-items-center">
      
          <div className="dropdown me-3">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUserNavbar"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={profile}
                alt="Profile"
                width="40"
                height="40"
                className="rounded-circle"
              />
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end text-small"
              aria-labelledby="dropdownUserNavbar"
            >
              <li>
                
                <Link className="dropdown-item" to={`/user/${userId}`}>
                  Voir le Profil
                </Link>
              </li>
            </ul>
          </div>

         
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


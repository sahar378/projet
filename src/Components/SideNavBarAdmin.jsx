import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Sidenav.css'; // Make sure to import the CSS

const SidenavAdmin = () => {
  return (
    <div className="d-flex flex-column sidenav">
      <div className="nav flex-column">
        <Link className="nav-link" to="/ValidateRegistration">
          Validate Registration
        </Link>
        <Link className="nav-link" to="/UserManagement">
          User Management
        </Link>
        <Link className="nav-link" to="/TimeTracking">
          Time Tracking
        </Link>
        <Link className="nav-link" to="/Report">
          Report
        </Link>
        <Link className="nav-link" to="/TimeOff_Absence">
          Time Off & Absence
        </Link>
      </div>
    </div>
  );
};

export default SidenavAdmin;

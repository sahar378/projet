import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Sidenav.css'; // Make sure to import the CSS

const SidenavWorker = () => {
  return (
    <div className="d-flex flex-column sidenav">
      <h3>Welcome <br /> To Your Space</h3>
      <div className="nav flex-column">
        <Link className="nav-link" to="/Tasks">
          Tasks
        </Link>
      </div>
    </div>
  );
};

export default SidenavWorker;

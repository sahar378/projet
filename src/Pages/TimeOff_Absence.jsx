import React from 'react'
import SidenavAdmin from '../Components/SideNavBarAdmin'
import Navbar from '../Components/NavBar';

function TimeOff_Absence() {
  const loadingMessageStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '1.2rem',
  };

  const messageStyle = {
    margin: '10px 0',
  };

  const underDevelopmentStyle = {
    fontSize: '1rem',
    color: '#6c757d',  // Gray color
    fontStyle: 'italic',
  };

  return (
    <div>
    <Navbar />
    <div className="d-flex">
      <div className="flex-grow-3">
        <SidenavAdmin />
      </div>
      <div className="flex-grow-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={loadingMessageStyle}>
          <p style={messageStyle}>Loading ...</p>
          <p style={underDevelopmentStyle}>This page is under development.</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TimeOff_Absence
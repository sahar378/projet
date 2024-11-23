import React from 'react';
import SidenavAdmin from '../Components/SideNavBarAdmin';


function ValidateRegistration() {
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
      <SidenavAdmin />
      <div style={loadingMessageStyle}>
        <p style={messageStyle}>Loading ...</p>
        <p style={underDevelopmentStyle}>This page is under development.</p>
      </div>
    </div>
  );
}

export default ValidateRegistration;



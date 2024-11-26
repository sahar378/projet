import React from 'react';
import SidenavAdmin from '../Components/SideNavBarAdmin';
import UsersList from '../Components/UserList';
import Navbar from '../Components/NavBar';



function ValidateRegistration() {


  return (
    <div>
    <Navbar />
    <div className="d-flex">
      <div className="flex-grow-3">
        <SidenavAdmin />
      </div>
      <div className="flex-grow-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <UsersList />
      </div>
    </div>
  </div>
  
  
  );
}

export default ValidateRegistration;



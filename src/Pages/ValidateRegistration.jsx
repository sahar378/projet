import React from 'react';
import SidenavAdmin from '../Components/SideNavBarAdmin';
import UsersList from '../Components/UserList';



function ValidateRegistration() {


  return (
    <div className="d-flex">
    <div className="flex-grow-1"><SidenavAdmin/></div>
      <UsersList/>
    </div>
  );
}

export default ValidateRegistration;



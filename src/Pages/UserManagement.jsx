import React from 'react'
import SidenavAdmin from '../Components/SideNavBarAdmin'
import ListUsers from '../Components/ListUsers'
import Navbar from '../Components/NavBar'




function UserManagement() {
  return (
    <div>
    <Navbar />
    <div className="d-flex">
      <div className="flex-grow-3">
        <SidenavAdmin />
      </div>
      <div className="flex-grow-1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ListUsers/>
      </div>
    </div>
  </div>
   
   
    

    
  )
}
export default UserManagement
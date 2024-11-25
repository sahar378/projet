import React from 'react'
import SidenavAdmin from '../Components/SideNavBarAdmin'
import ListUsers from '../Components/ListUsers'




function UserManagement() {
  return (
    <div className="d-flex">
      <div className="flex-grow-1"><SidenavAdmin/></div>
      <ListUsers/>
    </div>

    
  )
}
export default UserManagement
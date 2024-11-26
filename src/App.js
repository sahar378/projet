import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Components/NavBar';
import ListUsers from './Components/ListUsers';
import UserUpdate from './Components/UserUpdate';
import UserDelete from './Components/UserDelete';
import AddUser from './Components/AddUser';
import Register from './Components/Register';
import EditUserProfile from './Pages/EditUserProfile';
import AdminSpace from './spaces/admin_space';
import WorkerSpace from './spaces/worker_space';
import ValidateRegistration from './Pages/ValidateRegistration';
import UserManagement from './Pages/UserManagement';
import TimeOff_Absence from './Pages/TimeOff_Absence';

import Report from './Pages/Report';
import ProfileManagement from './Components/ProfileManagement';
import TimeTracking from './Pages/TimeTracking ';
import Tasks from './Pages/Tasks';
import ProfileContainer from './Components/ProfileContainer';
import UsersList from './Components/UserList';
import Login from './Components/Login';

const App = () => {
  return (
   
      <div className="d-flex">
        <div className="flex-grow-1">
         
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/listUsers" element={<ListUsers />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update/:id" element={<UserUpdate />} />
            <Route path="UserManagement/profile/:id" element={<ProfileContainer />}/>
            <Route path="/delete/:id" element={<UserDelete />} />
            <Route path="/add" element={<AddUser />} />
            <Route path="/ValidateRegistration" element={<ValidateRegistration />} />
            <Route path="/TimeTracking" element={<TimeTracking />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/TimeOff_Absence" element={<TimeOff_Absence />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/adminSpace" element={<AdminSpace />} />
            <Route path="/workerSpace" element={<WorkerSpace />} />
            <Route path="/user/:id" element={<ProfileManagement />} />
            <Route path="/user/:id/edit" element={<EditUserProfile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/accept" element={<UsersList/>}/>
          </Routes>
        </div>
      </div>
    
  );
};

export default App;

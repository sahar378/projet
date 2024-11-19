import Banner from './Banner'
//import UserDetail from './UserDetail'
import ListUsers from './ListUsers.jsx';
import { Routes, Route } from 'react-router-dom'; // Importer Routes et Route
//import UserProfile from './UserProfile'; // Assurez-vous d'importer votre composant UserProfile
import UserUpdate from './UserUpdate.jsx';
import UserDelete from './UserDelete.jsx';
import AddUser from './AddUser.jsx';
import ProfileContainer from './ProfileContainer.jsx';
//<Route path="/user/:id" element={<UserProfile />} /> {/* Page de détails de l'utilisateur */}

function App() {
  return (
		<div>
			<Banner />
      <h1>Gestion des Utilisateurs</h1>
      <Routes>
        <Route path="/" element={<ListUsers />} /> {/* Page principale avec la liste des utilisateurs */}
        
        <Route path="/update/:id" element={<UserUpdate />} /> {/* Page d'update de l'utilisateur */}
        <Route path="/delete/:id" element={<UserDelete />} />
        <Route path="/add" element={<AddUser />} /> {/* Route pour ajouter un utilisateur */}
        <Route path="/profile/:id" element={<ProfileContainer />} 
/>



      </Routes>
      
      
		</div>
    
	)
}

export default App
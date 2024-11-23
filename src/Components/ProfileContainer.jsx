import { useParams } from 'react-router-dom';
import ProfileManagement from './ProfileManagement';
import UserProfile from './UserProfile';

function ProfileContainer() {
  const { id } = useParams(); 
  return <UserProfile userId={id} />; 
}

export default ProfileContainer;

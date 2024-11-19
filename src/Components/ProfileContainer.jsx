import { useParams } from 'react-router-dom'
import UserProfile from './UserProfile'

function ProfileContainer() {
  const { id } = useParams()
  return <UserProfile id={id} />
}

export default ProfileContainer

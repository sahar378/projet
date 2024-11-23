import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import '../Styles/ProfileManagement.css';

const ProfileManagement = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // Used for navigation to the edit page
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  // Conditionally render image (either URL or base64)
  const renderImage = (image) => {
    if (image) {
      // If the image is a URL, display it directly
      if (image.startsWith('http')) {
        return <img src={image} alt="User Profile" className="profile-image" />;
      } else {
        // If it's base64 encoded, use it as a source
        return <img src={`data:image/jpeg;base64,${image}`} alt="User Profile" className="profile-image" />;
      }
    } else {
      return <div className="no-image">No image available</div>;
    }
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p>{renderImage(user.image)}</p>
        <p><strong>ID Card: </strong>{user.cin}</p>
        <p><strong>Last Name: </strong>{user.nom}</p>
        <p><strong>First Name: </strong>{user.prenom}</p>
        <p><strong>Date of Birth: </strong>{user.dateNaissance}</p>
        <p><strong>Email: </strong>{user.email}</p>
        <p><strong>Password: </strong>{user.password}</p>
        <p><strong>Phone: </strong>{user.telephone}</p>
        <p><strong>Full Address: </strong>{user.adresseComplet}</p>
        <p><strong>Position: </strong>{user.poste}</p>
        <p><strong>Start Date: </strong>{user.dateDebutTravail}</p>
      </div>
      <button
        className="edit-button"
        onClick={() => navigate(`/user/${id}/edit`)} // Redirect to the edit page
      >
        Edit
      </button>
    </div>
  );
};

export default ProfileManagement;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService'; 
import UserProfile from './UserProfile'; 

function UserDelete() {
    const { id } = useParams(); 
    const navigate = useNavigate(); 

    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    const [userData, setUserData] = useState(null); 

    
    useEffect(() => {
        UserService.getUserById(id) 
            .then((data) => {
                console.log('Données récupérées:', data); 
                setUserData(data); 
                setLoading(false); 
            })
            .catch((error) => {
                setError(error.message); 
                setLoading(false); 
            });
    }, [id]); 

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        
        if (confirmDelete) {
            UserService.deleteUser(id) 
                .then(() => {
                    console.log('Utilisateur supprimé avec succès');
                    navigate('/UserManagement'); 
                })
                .catch((error) => {
                    setError(error.message); 
                });
        }
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    if (!userData) {
        return <div>User not found</div>; 
    }

    return (
        <div>
            <p>Are you sure you want to delete this user?</p>
            
            
            <UserProfile id={id} />

            <button onClick={handleDelete}>Confirm the deletion</button>
        </div>
    );
}

export default UserDelete; 
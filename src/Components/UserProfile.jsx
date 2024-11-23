import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import UserService from '../Services/UserService'; 

function UserProfile() {
    const { id } = useParams(); 
    const [profileData, setProfileData] = useState({}); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        console.log('ID récupérées:', { id }); 

        UserService.getUserById(id)
            .then((userData) => {
                console.log('Données utilisateur:', userData); 

                if (userData) {
                    setProfileData(userData); 
                    setLoading(false); 
                } else {
                    setError('User not found');
                    setLoading(false); 
                }
            })
            .catch((error) => {
                setError(error.message); 
                setLoading(false); 
            });
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (error) {
        return <div>{error}</div>; 
    }

    const {
        nom,
        prenom,
        email,
        username,
        password,
        telephone,
        cin,
        dateNaissance,
        dateDebutTravail,
        poste,
        adresseComplet,
        image,
    } = profileData; 

    return (
        <div>
            <h2>User Information</h2>
            <p><strong>First Name :</strong> {prenom || 'N/A'}</p>
            <p><strong>Last Name :</strong> {nom || 'N/A'}</p>
            <p><strong>Email :</strong> {email || 'N/A'}</p>
            <p><strong>Username :</strong> {username || 'N/A'}</p>
            <p><strong>Password :</strong> {password || 'N/A'}</p> 
            <p><strong>Phone :</strong> {telephone || 'N/A'}</p>
            <p><strong>ID Card :</strong> {cin || 'N/A'}</p>
            <p><strong>Birth Date :</strong> {dateNaissance ? new Date(dateNaissance).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Start Date :</strong> {dateDebutTravail ? new Date(dateDebutTravail).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Position :</strong> {poste || 'N/A'}</p>
            <p><strong>Full Address  :</strong> {adresseComplet || 'N/A'}</p>
            {image && (
                <div>
                    <strong>Image :</strong>
                    <img src={URL.createObjectURL(image)} alt="Profil" style={{ width: 100, height: 100 }} />
                </div>
            )}
        </div>
    );
}

export default UserProfile; 
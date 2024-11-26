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
    const base64Image = image ? `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(image)))}` : null;

    return (
        <div>
            <h2>Informations utilisateur</h2>
            <p><strong>Nom :</strong> {nom || 'N/A'}</p>
            <p><strong>Prénom :</strong> {prenom || 'N/A'}</p>
            <p><strong>Email :</strong> {email || 'N/A'}</p>
            <p><strong>Nom d'utilisateur :</strong> {username || 'N/A'}</p>
            <p><strong>Mot de passe :</strong> {password || 'N/A'}</p>
            <p><strong>Téléphone :</strong> {telephone || 'N/A'}</p>
            <p><strong>CIN :</strong> {cin || 'N/A'}</p>
            <p><strong>Date de naissance :</strong> {dateNaissance ? new Date(dateNaissance).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Date de début de travail :</strong> {dateDebutTravail ? new Date(dateDebutTravail).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Poste :</strong> {poste || 'N/A'}</p>
            <p><strong>Adresse complète :</strong> {adresseComplet || 'N/A'}</p>
            {base64Image && <img src={`data:image/jpeg;base64,${image}`} alt="Profil utilisateur" style={{ width: '100px', height: '100px' }} />}
        </div>
       
    );
}

export default UserProfile; 
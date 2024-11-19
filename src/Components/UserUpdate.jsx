import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserUpdate() {
    const { id } = useParams(); // Récupérer l'ID depuis l'URL
    console.log("id:" , { id } )
    const navigate = useNavigate(); // Pour rediriger après la mise à jour

    const [profileData, setProfileData] = useState(null); // État pour stocker les données du profil
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs

    // Récupérer les données de l'utilisateur
    useEffect(() => {
        fetch(`http://localhost:8080/Utilisateurs?id=${id}`) // Remplacez par votre URL d'API
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données'); // Gérer les erreurs de réponse
                }
                return response.json(); // Convertir la réponse en JSON
            })
            .then((data) => {
                console.log('Données récupérées:', data); // Log des données récupérées
                setProfileData(data); // Mettre à jour l'état avec les données récupérées
                setLoading(false); // Fin du chargement
            })
            .catch((error) => {
                setError(error.message); // Mettre à jour l'état d'erreur
                setLoading(false); // Fin du chargement même en cas d'erreur
            });
    }, [id]); // Dépendance sur id

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '', // Si nécessaire, sinon vous pouvez l'ignorer pour la mise à jour
        starterDate: '',
        age: 0,
        active: false,
    });

    useEffect(() => {
        if (profileData) {
            setFormData({
                firstName: profileData.firstName || '',
                lastName: profileData.lastName || '',
                email: profileData.email || '',
                password: '', // Ne pas pré-remplir le mot de passe pour des raisons de sécurité
                starterDate: profileData.starterDate ? profileData.starterDate.substring(0, 10) : '', // Format YYYY-MM-DD
                age: profileData.age || 0,
                active: profileData.active || false,
            });
        }
    }, [profileData]); // Dépendance sur profileData

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmUpdate = window.confirm("Are you sure you want to edit this user's information ?");
        
        if (confirmUpdate) {
            fetch(`http://localhost:8080/Utilisateurs/${id}`, { 
                method: 'PUT', // Ou 'PATCH' selon votre API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id  // Inclure l'ID si nécessaire par votre API
                }),
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la mise à jour des données'); 
                }
                return response.json();
            })
            .then(() => {
                console.log('Utilisateur mis à jour avec succès');
                navigate(`/`); // Redirection vers la page de profil de l'utilisateur après la mise à jour
            })
            .catch((error) => {
                setError(error.message); // Mettre à jour l'état d'erreur en cas d'échec de la mise à jour
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Afficher un message de chargement si loading est true
    }

    if (error) {
        return <div>{error}</div>; // Afficher un message d'erreur si une erreur est survenue
    }

    if (!profileData) {
        return <div>User not found</div>; // Gérer le cas où l'utilisateur n'existe pas
    }

    return (
        <div>
            <h2>Update user informations</h2>
            <form onSubmit={handleSubmit}>
                <label>
                FirstName:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label>
                LastName:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Laissez vide si inchangé" />
                </label>
                <label>
                StarterDate:
                    <input type="date" name="starterDate" value={formData.starterDate} onChange={handleChange} required />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required />
                </label>
                <label>
                    Actif:
                    <input type="checkbox" name="active" checked={formData.active} onChange={(e) => handleChange({ target: { name: 'active', value: e.target.checked } })} />
                </label>
                
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UserUpdate; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importer Axios
import UserProfile from './UserProfile'; // Assurez-vous que le chemin est correct

function UserDelete() {
    const { id } = useParams(); // Récupérer l'ID depuis l'URL
    const navigate = useNavigate(); // Pour rediriger après la suppression

    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [error, setError] = useState(null); // État pour gérer les erreurs
    const [userData, setUserData] = useState(null); // État pour stocker les données de l'utilisateur

    // Récupérer les données de l'utilisateur pour confirmation avant suppression
    useEffect(() => {
        axios.get(`http://localhost:8080/users?id=${id}`) // Remplacez par votre URL d'API
            .then((response) => {
                console.log('Données récupérées:', response.data); // Log des données récupérées
                setUserData(response.data);//data[0]} // Mettre à jour l'état avec les données récupérées (supposant que c'est un tableau)
                setLoading(false); // Fin du chargement
            })
            .catch((error) => {
                setError(error.message); // Mettre à jour l'état d'erreur
                setLoading(false); // Fin du chargement même en cas d'erreur
            });
    }, [id]); // Dépendance sur id

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to edit this user's information  ?");
        
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/users/${id}`) // Méthode pour supprimer l'utilisateur
                .then(() => {
                    console.log('Utilisateur supprimé avec succès');
                    navigate('/'); // Redirection vers la liste des utilisateurs après la suppression
                })
                .catch((error) => {
                    setError(error.message); // Mettre à jour l'état d'erreur en cas d'échec de la suppression
                });
        }
    };

    if (loading) {
        return <div>Chargement...</div>; // Afficher un message de chargement si loading est true
    }

    if (error) {
        return <div>{error}</div>; // Afficher un message d'erreur si une erreur est survenue
    }

    if (!userData) {
        return <div>Utilisateur non trouvé</div>; // Gérer le cas où l'utilisateur n'existe pas
    }

    return (
        <div>
            <p>Are you sure you want to edit this user's information ?</p>
            
            {/* Utilisation du composant UserProfile pour afficher les informations de l'utilisateur */}
            <UserProfile id={id} /> {/* Passer l'ID à UserProfile */}

            <button onClick={handleDelete}>confirm deletion</button>
        </div>
    );
}

export default UserDelete;
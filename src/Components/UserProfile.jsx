import React, { Component } from 'react';
import axios from 'axios'; // Importer Axios

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {}, // État pour stocker les données du profil
            loading: true, // État pour gérer le chargement
            error: null // État pour gérer les erreurs
        };
    }

    componentDidMount() {
        const { id } = this.props; // Récupérer l'ID depuis les props
        console.log('id récupérées:', { id }); // Log des données récupérées

        // Remplacez par votre URL d'API
        axios.get(`http://localhost:8080/Utilisateurs?id=${id}`)
            .then((response) => {
                console.log('Données récupérées:', response.data); // Log des données récupérées
                
                // Filtrer pour trouver l'utilisateur correspondant à l'ID
                const userData = response.data.find(user => user.id === parseInt(id));
                console.log('Données utilisateur:', userData); // Log des données utilisateur

                if (userData) {
                    this.setState({ 
                        profileData: userData,
                        loading: false 
                    });
                } else {
                    this.setState({ 
                        error: 'Utilisateur non trouvé',
                        loading: false 
                    });
                }
            })
            .catch((error) => {
                this.setState({ 
                    error: error.message, // Mettre à jour l'état d'erreur
                    loading: false // Fin du chargement même en cas d'erreur
                });
            });
    }

    render() {
        const { profileData, loading, error } = this.state; 

        if (loading) {
            return <div>Chargement...</div>; // Afficher un message de chargement si loading est true
        }

        if (error) {
            return <div>{error}</div>; // Afficher un message d'erreur si une erreur est survenue
        }

        const {
            lastName,
            firstName,
            email,
             password,
            starterDate,
            age,
            active,
        } = profileData; // Déstructurer profileData

        return (
            <div>
                <h2>user informations</h2>
                <p><strong>firstName :</strong> {firstName || 'N/A'}</p> {/* Affichage du prénom */}
                <p><strong>lastName :</strong> {lastName || 'N/A'}</p> {/* Affichage du nom de famille */}
                <p><strong>Email :</strong> {email || 'N/A'}</p> {/* Affichage de l'email */}
                <p><strong>Password :</strong> {password || 'N/A'}</p> {/* Affichage du prénom */}
                <p><strong>starterDate :</strong> {starterDate ? new Date(starterDate).toLocaleDateString() : 'N/A'}</p> {/* Affichage de la date de début au format local */}
                <p><strong>Age :</strong> {age !== undefined ? age : 'N/A'}</p> {/* Affichage de l'âge */}
                <p><strong>Actif :</strong> {active !== undefined ? (active ? 'Oui' : 'Non') : 'N/A'}</p> {/* Affichage si l'utilisateur est actif ou non */}
            </div>
        );
    }
}

export default UserProfile; // Exportation du composant UserProfile pour pouvoir l'utiliser ailleurs dans l'application
import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileData: {},
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        const { id } = this.props;

        axios
            .get(`http://localhost:8080/users?id=${id}`)
            .then((response) => {
                const userData = response.data.find(user => user.id === parseInt(id));

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
                    error: error.message,
                    loading: false 
                });
            });
    }

    render() {
        const { profileData, loading, error } = this.state; 

        if (loading) {
            return <div>Chargement...</div>;
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
            image, // Assume this is a byte array
        } = profileData;

        // Convert byte array to Base64 string
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
}

export default UserProfile;
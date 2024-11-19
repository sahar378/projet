import React, { Component } from 'react';
import axios from 'axios'; // Importer Axios
import UserItem from './UserItem';
import '../Styles/ListUsers.css';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation

class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], // État pour stocker la liste des utilisateurs
            loading: true, // État pour gérer le chargement
            error: null // État pour gérer les erreurs
        };
    }

    componentDidMount() {
        // Remplacez par votre URL d'API
        axios.get('http://localhost:8080/Utilisateurs') 
            .then((response) => {
                console.log('Données récupérées:', response.data); // Log des données récupérées
                this.setState({ 
                    users: response.data, // Mettre à jour l'état avec les données récupérées
                    loading: false // Fin du chargement
                });
            })
            .catch((error) => {
                this.setState({ 
                    error: error.message, // Mettre à jour l'état d'erreur
                    loading: false // Fin du chargement même en cas d'erreur
                });
            });
    }

    render() {
        const { users, loading, error } = this.state; // Déstructurer l'état

        if (loading) {
            return <div>Chargement...</div>; // Afficher un message de chargement si loading est true
        }

        if (error) {
            return <div>{error}</div>; // Afficher un message d'erreur si une erreur est survenue
        }

        return (
            <div>
                <h2>Users List</h2>

                {/* Lien vers le composant AddUser */}
                <Link to="/add">
                    <button onClick={() => console.log(`Vous allez ajouter un utilisateur:`)}>
                        Add new user
                    </button>
                </Link>
                <ul className='lmj-plant-list'>
                    {users.map(({ id, image, lastName, firstName }) => (
                        <UserItem
                            key={id} // Ajoutez une clé unique ici pour chaque élément de la liste
                            id={id}
                            image={image}
                            nom={lastName}  // Assurez-vous que ces propriétés existent dans votre réponse JSON
                            prenom={firstName}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ListUsers;
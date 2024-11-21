import React, { Component } from 'react';
import axios from 'axios';
import UserItem from './UserItem';
import '../Styles/ListUsers.css';
import { Link } from 'react-router-dom';

class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8080/users')
            .then((response) => {
                console.log('Données récupérées:', response.data);
                this.setState({ 
                    users: response.data,
                    loading: false
                });
            })
            .catch((error) => {
                this.setState({ 
                    error: error.message,
                    loading: false
                });
            });
    }

    render() {
        const { users, loading, error } = this.state;

        if (loading) {
            return <div>Chargement...</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div>
                <h2>Users List</h2>

                <Link to="/add">
                    <button>
                        Add new user
                    </button>
                </Link>
                <ul className='lmj-plant-list'>
                    {users.map(user => (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            nom={user.nom}
                            prenom={user.prenom}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default ListUsers;
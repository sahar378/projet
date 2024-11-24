import React, { useEffect, useState } from 'react';
import UserService from '../Services/UserService'; 
import UserItem from './UserItem';
import '../Styles/ListUsers.css';
import { Link } from 'react-router-dom'; 

function ListUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        UserService.getAllUsersActive()
            .then((response) => {
                console.log('Données récupérées:', response);
                setUsers(response);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
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

export default ListUsers;
import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import '../Styles/UserItem.css';

function UserItem({ id, image, nom, prenom }) {
    return (
        <li key={id} className='lmj-plant-item'>
            <Link to={`/profile/${id}`}> {/* Lien autour de l'image pour rediriger vers le profil utilisateur */}
                <img 
                    className='lmj-plant-item-cover' 
                    src={image} 
                    alt={`${nom} cover`} 
                />
            </Link>
            <div>
                {nom} {prenom}
                <div className='user-item-buttons'>
                <Link to={`/update/${id}`}><button onClick={() => console.log(`Modifier l'utilisateur: ${id}`)}>Update</button> </Link>
                <Link to={`/delete/${id}`}><button onClick={() => console.log(`Supprimer l'utilisateur: ${id}`)}>Delete</button></Link>
                </div>
            </div>
        </li>
    );
}

export default UserItem;
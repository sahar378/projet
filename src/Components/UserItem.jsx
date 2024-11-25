import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/UserItem.css';

function UserItem({ id, image, nom, prenom }) {
    return (
        <li key={id} className='lmj-plant-item'>
            <Link to={`profile/${id}`}>
                <img 
                    className='lmj-plant-item-cover' 
                    src={`data:image/jpeg;base64,${image}`} 
                    alt={`${nom} cover`} 
                />
            </Link>
            <div>
                {nom} {prenom}
                <div className='user-item-buttons'>
                    <Link to={`/update/${id}`}>
                        <button>Update</button>
                    </Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to={`/delete/${id}`}>
                        <button>Delete</button>
                    </Link>
                </div>
            </div>
        </li>
    );
}

export default UserItem;
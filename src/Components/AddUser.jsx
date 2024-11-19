import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userList as initialUserList } from '../Datas/userList'; // Assurez-vous que ce chemin est correct

function AddUser() {
    const navigate = useNavigate(); // Pour rediriger après l'ajout
    const [userList, setUserList] = useState(initialUserList); // État local pour la liste des utilisateurs
    const [formData, setFormData] = useState({
        id: '',
        nom: '',
        prenom: '',
        username: '',
        email: '',
        password: '',
        telephone: '',
        cin: '',
        adresseComplet: '',
        poste: '',
        dateNaissance: '',
        dateDebutTravail: '',
        image: '', // Vous pouvez mettre une image par défaut si nécessaire
        department: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Générer un nouvel ID (vous pouvez utiliser une logique plus robuste pour générer des IDs uniques)
        const newId = Date.now().toString();

        // Créer un nouvel utilisateur
        const newUser = { ...formData, id: newId };

        // Mettre à jour la liste des utilisateurs
        setUserList([...userList, newUser]);

        console.log('Nouvel utilisateur ajouté:', newUser);

        // Rediriger vers la liste des utilisateurs après l'ajout
        navigate('/users'); // Changez ce chemin selon vos besoins
    };

    return (
        <div>
            <h2>Ajouter un Nouvel Utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} required />
                </label>
                <label>
                    Prénom:
                    <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} required />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <label>
                    Mot de Passe:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <label>
                    Téléphone:
                    <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
                </label>
                <label>
                    CIN:
                    <input type="text" name="cin" value={formData.cin} onChange={handleChange} required />
                </label>
                <label>
                    Adresse Complète:
                    <input type="text" name="adresseComplet" value={formData.adresseComplet} onChange={handleChange} required />
                </label>
                <label>
                    Poste:
                    <input type="text" name="poste" value={formData.poste} onChange={handleChange} required />
                </label>
                <label>
                    Date de Naissance:
                    <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleChange} required />
                </label>
                <label>
                    Date de Début de Travail:
                    <input type="date" name="dateDebutTravail" value={formData.dateDebutTravail} onChange={handleChange} required />
                </label>
                {/* Vous pouvez ajouter un champ pour l'image si nécessaire */}
                {/* 
                <label>
                    Image URL:
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />
                </label> 
                */}
                <label>
                    Département:
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                </label>

                <button type="submit">Ajouter Utilisateur</button>
            </form>
        </div>
    );
}

export default AddUser;
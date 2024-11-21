import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les données de l'utilisateur
    useEffect(() => {
        fetch(`http://localhost:8080/users?id=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.length > 0) {
                    setProfileData(data[0]); // Assurez-vous que l'utilisateur est non vide
                } else {
                    throw new Error('Utilisateur non trouvé');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        password: '',
        telephone: '',
        cin: '',
        dateNaissance: '',
        dateDebutTravail: '',
        poste: '',
        adresseComplet: '',
        image: null,
    });

    useEffect(() => {
        if (profileData) {
            setFormData({
                nom: profileData.nom || '',
                prenom: profileData.prenom || '',
                email: profileData.email || '',
                username: profileData.username || '',
                password: '',
                telephone: profileData.telephone || '',
                cin: profileData.cin || '',
                dateNaissance: profileData.dateNaissance || '',
                dateDebutTravail: profileData.dateDebutTravail || '',
                poste: profileData.poste || '',
                adresseComplet: profileData.adresseComplet || '',
                image: profileData.image || null,
            });
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const confirmUpdate = window.confirm("Êtes-vous sûr de vouloir modifier ces informations ?");
        
        if (confirmUpdate) {
            fetch(`http://localhost:8080/users/${id}`, { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    id,
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
                navigate(`/`); // Redirection après la mise à jour
            })
            .catch((error) => {
                setError(error.message);
            });
        }
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Modifier les informations de l'utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="telephone">Téléphone</label>
                    <input
                        type="text"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="cin">CIN</label>
                    <input
                        type="text"
                        id="cin"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="dateNaissance">Date de naissance</label>
                    <input
                        type="date"
                        id="dateNaissance"
                        name="dateNaissance"
                        value={formData.dateNaissance}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="dateDebutTravail">Date de début de travail</label>
                    <input
                        type="date"
                        id="dateDebutTravail"
                        name="dateDebutTravail"
                        value={formData.dateDebutTravail}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="poste">Poste</label>
                    <input
                        type="text"
                        id="poste"
                        name="poste"
                        value={formData.poste}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="adresseComplet">Adresse complète</label>
                    <input
                        type="text"
                        id="adresseComplet"
                        name="adresseComplet"
                        value={formData.adresseComplet}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    />
                </div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
}

export default UserUpdate;
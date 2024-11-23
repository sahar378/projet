import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfile = () => {
  const { id } = useParams(); // Récupère l'ID utilisateur depuis l'URL
  const navigate = useNavigate(); // Permet de naviguer vers la page de modification
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/User/${id}`);
        if (!response.ok) throw new Error('Utilisateur non trouvé');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center">Profil Utilisateur</h2>
      <div className="mt-4">
        <p><strong>Image : </strong>{user.image}</p>
        <p><strong>Cin : </strong>{user.cin}</p>
        <p><strong>Nom : </strong>{user.nom}</p>
        <p><strong>Prénom : </strong>{user.prenom}</p>
        <p><strong>Date de Naissance : </strong>{user.dateNaissance}</p>
        <p><strong>Email : </strong>{user.email}</p>
        <p><strong>Password : </strong>{user.password}</p>
        <p><strong>Téléphone : </strong>{user.telephone}</p>
        <p><strong>Adresse Complet : </strong>{user.adresseComplet}</p>
        <p><strong>Poste : </strong>{user.poste}</p>
        <p><strong>Date Début Travail : </strong>{user.dateDebutTravail}</p>
      </div>
      <button
        className="btn btn-primary btn-block mt-4"
        onClick={() => navigate(`/user/${id}/edit`)} // Redirige vers la page d'édition
      >
        Modifier
      </button>
    </div>
  );
};

export default UserProfile;

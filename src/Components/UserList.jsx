import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      alert("Impossible de récupérer les utilisateurs. Veuillez réessayer.");
    }
  };

  const updateUserState = (userId, updates) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updates } : user
      )
    );
  };

  const handleAccept = async (userId) => {
    try {
      // Met à jour le statut actif de l'utilisateur
      await axios.put(`http://localhost:8080/users/active/${userId}`, {
        active: true,
      });

      // Envoie un email à l'utilisateur
      await axios.post(`http://localhost:8080/users/${userId}/send-email`);

      alert("Utilisateur accepté et email envoyé avec succès.");
      fetchUsers(); // Recharge la liste des utilisateurs
    } catch (error) {
      console.error("Erreur lors de l'acceptation de l'utilisateur :", error);

      if (error.response) {
        alert(
          `Erreur: ${error.response.data.error || error.response.statusText}`
        );
      } else {
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  const handleRefuse = async (userId) => {
    try {
      updateUserState(userId, { isProcessing: true });

      // Supprime l'utilisateur
      await axios.delete(`http://localhost:8080/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

      alert("Utilisateur supprimé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      updateUserState(userId, { isProcessing: false });
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <div style={styles.cardContainer}>
        {users.map((user) => (
          <div key={user.id} style={styles.card}>
            <h2 style={styles.cardTitle}>
              {user.nom} {user.prenom}
            </h2>
            
            <p>Email: {user.email}</p>
            <p>
              <strong>Actif:</strong> {user.active ? "Oui" : "Non"}
            </p>
            <div style={styles.actions}>
              {!user.active && (
                <>
                  <button
                    style={styles.acceptButton}
                    onClick={() => handleAccept(user.id)}
                    disabled={user.isProcessing}
                  >
                    {user.isProcessing ? "Chargement..." : "Accepter"}
                  </button>
                  <button
                    style={styles.refuseButton}
                    onClick={() => handleRefuse(user.id)}
                    disabled={user.isProcessing}
                  >
                    {user.isProcessing ? "Chargement..." : "Refuser"}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    padding: "16px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.25rem",
    margin: "0 0 8px",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  },
  acceptButton: {
    padding: "8px 16px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#28a745",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  refuseButton: {
    padding: "8px 16px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#dc3545",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default UsersList;
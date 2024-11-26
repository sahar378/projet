// src/Composant/LogoutButton.js
import React from "react";
import { logout } from "../Services/authService";

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
    alert("Déconnexion réussie !");
    window.location.href = "/login"; // Redirection vers la page de connexion
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;

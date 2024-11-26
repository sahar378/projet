// src/Pages/ProtectedPage.js
import React from "react";
import { isAuthenticated } from "../Services/authService";

const ProtectedPage = () => {
  if (!isAuthenticated()) {
    return <p>Vous devez être connecté pour accéder à cette page.</p>;
  }

  return <p>Bienvenue sur la page protégée !</p>;
};

export default ProtectedPage;

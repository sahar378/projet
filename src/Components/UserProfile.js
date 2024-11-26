// src/Composant/UserProfile.js
import React from "react";
import { getUserInfo } from "../Services/authService";

const UserProfile = () => {
  const userInfo = getUserInfo();

  if (!userInfo) {
    return <p>Aucune information utilisateur disponible.</p>;
  }

  return (
    <div>
      <h2>Profil utilisateur</h2>
      <p>Nom d'utilisateur : {userInfo.sub}</p>
      <p>Rôles : {userInfo.roles.join(", ")}</p>
    </div>
  );
};

export default UserProfile;

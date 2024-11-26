import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../Services/apiService";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiService.getUserProfile();
        if (!data) {
          navigate("/login"); // Redirige si l'utilisateur n'est pas authentifié
        } else {
          setProfile(data);
        }
      } catch (error) {
        navigate("/login"); // Redirige en cas d'erreur
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div>
      <h2>Profil</h2>
      {profile ? (
        <div>
          <p>Nom d'utilisateur: {profile.username}</p>
          <p>Email: {profile.email}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default ProfilePage;

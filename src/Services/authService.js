import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:8080/api/auth/";
const API_USERS_URL = "http://localhost:8080/api/users/";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login`, { username, password });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};



// Fonction d'inscription
export const register = async (username, email, password) => {
  try {
    // Assurez-vous que l'URL est correcte et inclut le bon port (8080)
    const response = await axios.post(`${API_USERS_URL}register`, { username, email, password });
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

// Optionnel : Si vous souhaitez gérer d'autres informations sur l'utilisateur
export const getUserInfo = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user : null;
};

export const isAuthenticated = () => {
  const user = getUserInfo();
  return user ? true : false;
};

export const saveToken = (token) => {
  localStorage.setItem("user", JSON.stringify({ token }));
};
export const logout = () => {
  localStorage.removeItem("user");
};



import authHeader from "../Helpers/authHeader";

const API_URL = 'http://localhost:8080/api/auth';

const getUserProfile = () => {
  return fetch(API_URL + 'profile', {
    method: 'GET',
    headers: authHeader(),
  }).then((response) => response.json());
};

const apiService = {
  getUserProfile,
};

export default apiService;
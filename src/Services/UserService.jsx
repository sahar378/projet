import Axios from "axios";


const USER_ENDPOINT = "http://localhost:8080/users"; 

const UserService = {
    // Récupérer tous les utilisateurs
    getAllUsers: async () => {
        try {
            const response = await Axios.get(USER_ENDPOINT);
            return response.data; // Retourne la liste des utilisateurs
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
            throw error; // Relance l'erreur pour la gestion ultérieure
        }
    },


    // Récupérer un utilisateur par ID
    getUserById: async (id) => {
        try {
            const response = await Axios.get(`${USER_ENDPOINT}/${id}`);
            return response.data; // Retourne l'utilisateur trouvé
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur avec ID ${id}:`, error);
            throw error;
        }
    },

    // Mettre à jour un utilisateur
    updateUser: async (id, user) => {
        try {
            const response = await Axios.put(`${USER_ENDPOINT}/${id}`, user);
            return response.data; // Retourne l'utilisateur mis à jour
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'utilisateur avec ID ${id}:`, error);
            throw error;
        }
    },

    // Supprimer un utilisateur
    deleteUser: async (id) => {
        try {
            await Axios.delete(`${USER_ENDPOINT}/${id}`);
            return true; // Indique que la suppression a réussi
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'utilisateur avec ID ${id}:`, error);
            throw error;
        }
    },

};

export default UserService;
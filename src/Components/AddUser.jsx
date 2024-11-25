import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Style.css';
import Navbar from './NavBarRegistre';
function AddUser() {
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

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.nom) newErrors.nom = 'Nom est requis';
    if (!formData.prenom) newErrors.prenom = 'Prénom est requis';
    if (!formData.email) newErrors.email = 'Email est requis';
    if (!formData.username) newErrors.username = 'Nom d\'utilisateur est requis';
    if (!formData.password) newErrors.password = 'Mot de passe est requis';
    if (!formData.telephone) newErrors.telephone = 'Téléphone est requis';
    if (!formData.cin) newErrors.cin = 'CIN est requis';
    if (!formData.dateNaissance) newErrors.dateNaissance = 'Date de naissance est requise';
    if (!formData.dateDebutTravail) newErrors.dateDebutTravail = 'Date de début de travail est requise';
    if (!formData.poste) newErrors.poste = 'Poste est requis';
    if (!formData.adresseComplet) newErrors.adresseComplet = 'Adresse complète est requise';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setErrorMessage('');
    setSuccessMessage('');

    if (Object.keys(validationErrors).length === 0) {
      const formDataToSend = new FormData();
      formDataToSend.append("nom", formData.nom);
      formDataToSend.append("prenom", formData.prenom);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("telephone", formData.telephone);
      formDataToSend.append("cin", formData.cin);
      formDataToSend.append("dateNaissance", formData.dateNaissance);
      formDataToSend.append("dateDebutTravail", formData.dateDebutTravail);
      formDataToSend.append("poste", formData.poste);
      formDataToSend.append("adresseComplet", formData.adresseComplet);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      fetch('http://localhost:8080/users/si', {
        method: 'POST',
        body: formDataToSend,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Erreur lors de l\'enregistrement');
          }
          return response.json();
        })
        .then(data => {
          setSuccessMessage('Ajouter réussie !');
          setFormData({
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
          // Redirection vers la page de connexion après un court délai
          setTimeout(() => navigate('/accept'), 2000); 
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    }
  };

  return (
    <div>
       <Navbar/>
    <form onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <h1>Create Account</h1>
      <div>
        <input
          type="text"
          name="nom"
          placeholder="FirstName"
          value={formData.nom}
          onChange={handleChange}
        />
        {errors.nom && <span className="error">{errors.nom}</span>}
      </div>
      
      <div>
        <input
          type="text"
          name="prenom"
          placeholder="LastName"
          value={formData.prenom}
          onChange={handleChange}
        />
        {errors.prenom && <span className="error">{errors.prenom}</span>}
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="text"
          name="username"
          placeholder="UserName"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      <div>
        <input
          type="date"
          name="dateNaissance"
          value={formData.dateNaissance}
          onChange={handleChange}
        />
        {errors.dateNaissance && <span className="error">{errors.dateNaissance}</span>}
      </div>

      <div>
        <input
          type="date"
          name="dateDebutTravail"
          value={formData.dateDebutTravail}
          onChange={handleChange}
        />
        {errors.dateDebutTravail && <span className="error">{errors.dateDebutTravail}</span>}
      </div>

      <div>
        <input
          type="text"
          name="poste"
          placeholder="Job"
          value={formData.poste}
          onChange={handleChange}
        />
        {errors.poste && <span className="error">{errors.poste}</span>}
      </div>
      
      <div>
        <input
          type="text"
          name="telephone"
          placeholder="Phone"
          value={formData.telephone}
          onChange={handleChange}
        />
        {errors.telephone && <span className="error">{errors.telephone}</span>}
      </div>
      
      <div>
        <input
          type="text"
          name="cin"
          placeholder="CIN"
          value={formData.cin}
          onChange={handleChange}
        />
        {errors.cin && <span className="error">{errors.cin}</span>}
      </div>
      <div>
        <input
          type="text"
          name="adresseComplet"
          placeholder="Address Complet"
          value={formData.adresseComplet}
          onChange={handleChange}
        />
        {errors.adresseComplet && <span className="error">{errors.adresseComplet}</span>}
      </div>
      <div>
        <input
          type="file"
          name="image"
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Add</button>
    </form>
    </div>

  );
}

export default AddUser;

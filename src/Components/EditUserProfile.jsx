import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditUserProfile = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const navigate = useNavigate(); // Used to navigate back to the previous page
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setFormData(data); // Initialize the form with user data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Update failed');
      alert('User updated successfully');
      navigate(`/user/${id}`); // Redirect to profile page
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            name="telephone"
            value={formData.telephone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Full Address</label>
          <input
            type="text"
            className="form-control"
            name="adresseComplet"
            value={formData.adresseComplet || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            name="poste"
            value={formData.poste || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            className="form-control"
            name="dateNaissance"
            value={formData.dateNaissance || ''}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-3">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-block mt-2"
          onClick={() => navigate(`/users/${id}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUserProfile;

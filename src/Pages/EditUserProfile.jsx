import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import '../Styles/EditUser.css'

const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) throw new Error('Not Found User!');
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

      if (!response.ok) throw new Error('Error While Updating!Please try again!');
      alert('User Profile Updated Successfully!');
      navigate(`/user/${id}`);
    } catch (error) {
      alert(`Erreur: ${error.message}`);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group as={Row} controlId="telephone">
          <Form.Label column sm={2}>Phone</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="telephone"
              value={formData.telephone || ''}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="adresseComplet">
          <Form.Label column sm={2}>Full Adress</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="adresseComplet"
              value={formData.adresseComplet || ''}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="poste">
          <Form.Label column sm={2}>Position</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              name="poste"
              value={formData.poste || ''}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="dateNaissance">
          <Form.Label column sm={2}>Date of Birth</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance || ''}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Save
        </Button>
        <Button
          variant="secondary"
          type="button"
          className="mt-2 ml-2"
          onClick={() => navigate(`/user/${id}`)}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditUserProfile;

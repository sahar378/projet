import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
        Welcome to the Home Page!
      </Typography>
      <Typography variant="h5" paragraph>
        This is your starting point for navigating through the app. Feel free to explore our features and services.
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleNavigate}
          sx={{ borderRadius: 3 }}
        >
          Go to Login
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;

// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/users/login', {
                email,
                password
            });

            if (response.status === 200) {
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/home');
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Identifiants incorrects');
            } else {
                setError('Une erreur est survenue. Veuillez réessayer.');
            }
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/Register'); // Redirect to the registration page
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe :</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit">Connexion</button>
            </form>
            <h1>Pas de compte?</h1>
            <button onClick={handleRegisterRedirect} style={{ marginTop: '10px' }}>
                Créer un compte
            </button>
        </div>
    );
};

export default Login;
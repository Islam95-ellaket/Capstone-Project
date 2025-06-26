import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form inviato con:', { email, password }); //
  try {
    const userData = await loginUser({ email, password });
    console.log('Login avvenuto con successo', userData); //
    localStorage.setItem('token', userData.token);
    setUser({ name: userData.name });
    navigate('/');
  } catch (error) {
    console.error('Errore nel login:', error); // 
    alert('Credenziali non valide');
  }
};


  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Accedi</button>
      </form>
    </div>
  );
};

export default LoginPage;

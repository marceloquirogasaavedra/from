// src/components/Logout.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Logout.css';
const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de autenticación y cambiar el estado de autenticación
    localStorage.removeItem('token');
    onLogout();
    navigate('/'); // Redirigir al home
  };


};

export default Logout;

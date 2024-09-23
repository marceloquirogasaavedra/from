// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import AddRole from './components/AddRole';
import AddCategory from './components/AddCategory';
import RegisterUser from './components/RegisterUser';
import Producto from './components/producto';
import Logout from './components/Logout';
import './App.css';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <nav className='componentes'>
        <Link to="/"> Inicio </Link>
        {isAuthenticated && <Link to="/add-role"> Rol </Link>}
        {isAuthenticated && <Link to="/register-user"> Usuario </Link>}
        {isAuthenticated && <Link to="/produc"> Producto </Link>}
        {isAuthenticated && <Link to="/add-category"> Categoría </Link>}
        {isAuthenticated && <Link onClick={handleLogout}> salir </Link>}
        {isAuthenticated ? (
          <Logout onLogout={handleLogout} />
        ) : (
          <Link to="/login"> Login </Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
        <Route path="/add-role" element={isAuthenticated ? <AddRole /> : <Navigate to="/" />} />
        <Route path="/register-user" element={isAuthenticated ? <RegisterUser /> : <Navigate to="/" />} />
        
        <Route path="/produc" element={isAuthenticated ? <Producto /> : <Navigate to="/" />} />
        <Route path="/add-category" element={isAuthenticated ? <AddCategory /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

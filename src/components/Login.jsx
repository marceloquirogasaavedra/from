// src/components/Login.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import '../styles/Login.css';
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await login({ username, password });
      
      // Guardamos el token en localStorage
      localStorage.setItem('token', result.token);
      
      // Cambiamos el estado de autenticación
      onLogin();
      
      // Redirigimos al home
      navigate('/');
    } catch (err) {
      setError('Fallo en la autenticación');
    }
  };

  return (
    <div className='div1'>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className='formlogin'>
        <div className='div2'>
          <div>
          <label htmlFor="username" className='label1'>Usuario:</label>
          <input className='in_user'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div >
          <div >
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='div3'>
        <button className='boton1' type="submit">Iniciar sesión</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

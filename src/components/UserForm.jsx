// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { getRoles, registerUser } from '../api/user'; // Importamos las funciones de la API

const UserForm = ({ onUserRegistered }) => {
  const [username, setUsername] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(''); // Guardará el ID del rol seleccionado
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Cargar la lista de roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleData = await getRoles();
        setRoles(roleData);
      } catch (err) {
        setError('Error al cargar los roles');
      }
    };
    fetchRoles();
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedRole) {
      setError('Debes seleccionar un rol');
      return;
    }

    const userData = {
      username,
      correo,
      password,
      id_rol: selectedRole, // Usamos el ID del rol seleccionado
    };

    try {
      const result = await registerUser(userData);
      setResult(result);
      setError(null);

      // Actualizar la lista de usuarios en el componente padre
      onUserRegistered();
    } catch (err) {
      setError('Error al registrar el usuario');
      setResult(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="role">Selecciona un rol:</label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">Selecciona un rol</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Registrar Usuario</button>
      </form>

      {/* Mostrar resultado o error */}
      {result && (
        <div className="result">
          <h3>Usuario registrado con éxito:</h3>
          <p>Nombre de usuario: {result.username}</p>
          <p>Correo: {result.correo}</p>
          <p>Rol asignado: {roles.find((role) => role.id === result.id_rol?.id)?.name}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default UserForm;

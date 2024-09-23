// src/components/RoleList.jsx
import React, { useState, useEffect } from 'react';
import { getRoles } from '../api/role';
import '../styles/RoleList.css';  // Importa el archivo CSS aquí

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRoles = async () => {
    try {
      const roleData = await getRoles();
      setRoles(roleData);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar los roles');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoles();
  }, []);

  if (loading) {
    return <p className="loading">Cargando roles...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="role-list">
      <h2>Lista de Roles</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id}>
            {role.id} {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleList;

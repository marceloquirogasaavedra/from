// src/components/AddRole.jsx
import React, { useState } from 'react';
import { saveRole } from '../api/role';
import RoleList from './RoleList';
import '../styles/AddRole.css';  // Importa el archivo CSS aquí

const AddRole = () => {
  const [roleName, setRoleName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await saveRole({ name: roleName });
      setResult(result);
      setError(null);
    } catch (err) {
      setError('Error al guardar el rol');
      setResult(null);
    }
  };

  return (
    <div>
      <h2>Agregar un nuevo rol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="roleName">Nombre del rol:</label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Guardar rol</button>
      </form>

      {result && (
        <div className="result">
          <h3>Rol guardado con éxito:</h3>
          <p>ID: {result.id}</p>
          <p>Nombre: {result.name}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}

      <RoleList />
    </div>
  );
};

export default AddRole;

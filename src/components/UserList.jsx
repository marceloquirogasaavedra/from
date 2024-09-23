// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import { getUsers } from '../api/user'; // Importamos la función de la API

const UserList = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Cargar la lista de usuarios desde la API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        setError('Error al cargar los usuarios');
      }
    };
    fetchUsers();
  }, [refreshTrigger]); // Refrescar la lista cuando se registre un nuevo usuario

  return (
    <div className="user-list">
      <h3>Lista de Usuarios</h3>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.correo}</td>
              <td>{user.id_rol?.name || 'Sin rol asignado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;

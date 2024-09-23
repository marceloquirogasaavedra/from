// src/components/RegisterUser.jsx
import React, { useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import '../styles/RegisterUser.css'; // Importamos el CSS
import AddRole from './AddRole';

const RegisterUser = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Función para refrescar la lista de usuarios después de registrar un nuevo usuario
  const handleUserRegistered = () => {
    setRefreshTrigger(refreshTrigger + 1); // Cambia el valor para volver a cargar la lista
  };

  return (
    <div>
      <button onClick={AddRole}>crear rol</button>
      <div className="register-user">
        <h2>Registrar Usuario</h2>
        {/* Formulario de registro de usuarios */}
        <UserForm onUserRegistered={handleUserRegistered} />

        {/* Lista de usuarios */}
        <UserList refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default RegisterUser;

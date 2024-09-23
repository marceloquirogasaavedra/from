// src/api/auth.js

import axios from 'axios';

// URL de la API para el login
const loginUrl = 'http://localhost:8080/login';

// Función de login usando Axios
export const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials);
    
    // Verificamos si la autenticación fue correcta
    if (response.data && response.data.token) {
      // Guardamos el token en localStorage para futuras peticiones
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      console.log('Autenticación correcta:', response.data.Message);
      return response.data; // Retornamos los datos para que puedas usarlos en el componente
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};

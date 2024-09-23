import axios from 'axios';

const API_URL = 'http://localhost:8080/rol';

// Función para guardar un rol
export const saveRole = async (roleData) => {
  try {
    const response = await axios.post(`${API_URL}/guardar`, roleData);
    return response.data;
  } catch (error) {
    throw new Error('Error al guardar el rol');
  }
};

// Función para obtener la lista de roles
export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/listar`);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los roles');
  }
};

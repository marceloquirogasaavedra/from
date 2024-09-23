// src/api/user.js
import axios from 'axios';

const API_URL_USER = 'http://localhost:8080/usuario/guardar';
const API_URL_ROLE = 'http://localhost:8080/rol/listar';
const API_URL_USER_LIST = 'http://localhost:8080/usuario/listar'; // Nueva ruta para listar usuarios


// Función para registrar un usuario
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL_USER, userData);
    return response.data;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};

// Función para obtener la lista de roles
export const getRoles = async () => {
  try {
    const response = await axios.get(API_URL_ROLE);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los roles');
  }
};

// Función para obtener la lista de usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(API_URL_USER_LIST);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
};
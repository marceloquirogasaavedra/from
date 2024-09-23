// src/api/category.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/categoria';

// Función para listar categorías
export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener las categorías');
  }
};

// Función para agregar una categoría
export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(API_URL, categoryData);
    return response.data;
  } catch (error) {
    throw new Error('Error al agregar la categoría');
  }
};

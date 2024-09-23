import axios from 'axios';

// Crear el producto
export const createProducto = async (productoData) => {
  try {
    const response = await axios.post('http://localhost:8080/producto', productoData);
    return response.data; // Devuelve el producto creado con su ID
  } catch (error) {
    console.error('Error creando el producto:', error);
    throw error;
  }
};

// Subir la imagen del producto
export const uploadProductImage = async (productId, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    await axios.post(`http://localhost:8080/producto/${productId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error subiendo la imagen:', error);
    throw error;
  }
};

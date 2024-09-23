import React, { useState } from 'react';
import { createProducto, uploadProductImage } from '../api/producto'; // Importamos las funciones de la API

const AddProducto = () => {
  const [producto, setProducto] = useState({
    nombreProducto: '',
    descripcionProducto: '',
    fechaAgregado: '',
    idCategoria: '', // Para seleccionar la categoría del producto
  });

  const [imageFile, setImageFile] = useState(null);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      convertToWebP(file);
    }
  };

  // Convertir la imagen a formato WebP usando un canvas antes de cargarla
  const convertToWebP = (file) => {
    const reader = new FileReader();
    const img = new Image();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          const webpFile = new File([blob], 'image.webp', { type: 'image/webp' });
          setImageFile(webpFile);
        },
        'image/webp',
        0.8 // Calidad de la imagen (0.8)
      );
    };

    reader.readAsDataURL(file);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Crear el producto primero
      const newProducto = await createProducto(producto);

      // Subir la imagen al servidor después de crear el producto
      if (imageFile && newProducto?.idProducto) {
        await uploadProductImage(newProducto.idProducto, imageFile);
        alert('Producto y imagen subidos con éxito');
      }
    } catch (error) {
      console.error('Error al subir el producto:', error);
      alert('Hubo un error al subir el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="nombreProducto"
          value={producto.nombreProducto}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Descripción del Producto:</label>
        <textarea
          name="descripcionProducto"
          value={producto.descripcionProducto}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Fecha Agregado:</label>
        <input
          type="datetime-local"
          name="fechaAgregado"
          value={producto.fechaAgregado}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Categoría:</label>
        <input
          type="number"
          name="idCategoria"
          value={producto.idCategoria}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Imagen del Producto:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required />
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default AddProducto;

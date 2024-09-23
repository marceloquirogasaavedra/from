// src/components/AddCategory.jsx
import React, { useState } from 'react';
import { addCategory } from '../api/category'; // Importamos la función de la API
import CategoryList from './CategoryList'; // Importamos el componente para listar las categorías
import '../styles/AddCategory.css'; // Archivo CSS para estilos (más adelante)

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos la categoría a la API
      const result = await addCategory({ nombreCategoria: categoryName });
      setResult(result);
      setError(null);
    } catch (err) {
      setError('Error al agregar la categoría');
      setResult(null);
    }
  };

  return (
    <div className="add-category">
      <h2>Agregar una nueva categoría</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="categoryName">Nombre de la categoría:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar categoría</button>
      </form>

      {/* Mostrar el resultado o el error */}
      {result && (
        <div className="result">
          <h3>Categoría agregada con éxito:</h3>
          <p>ID: {result.idCategoria}</p>
          <p>Nombre: {result.nombreCategoria}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}

      {/* Mostrar la lista de categorías actualizadas */}
      <CategoryList />
    </div>
  );
};

export default AddCategory;

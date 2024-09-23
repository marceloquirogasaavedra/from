// src/components/CategoryList.jsx
import React, { useState, useEffect } from 'react';
import { getCategories } from '../api/category'; // Importamos la función de la API
import '../styles/CategoryList.css'; // Archivo CSS para estilos (más adelante)

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las categorías desde la API
  const loadCategories = async () => {
    try {
      const categoryData = await getCategories();
      setCategories(categoryData);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar las categorías');
      setLoading(false);
    }
  };

  // Llamamos a loadCategories cuando el componente se monta
  useEffect(() => {
    loadCategories();
  }, []);

  if (loading) {
    return <p className="loading">Cargando categorías...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="category-list">
      <h2>Lista de Categorías</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.idCategoria}>
           {category.idCategoria} {category.nombreCategoria}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

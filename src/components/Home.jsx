// src/components/Home.jsx

import React from 'react';
import '../styles/Home.css';
const Home = ({ isAuthenticated }) => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Tienda E-commerce</h1>
        {/* Aquí estaba el botón de iniciar sesión, pero ahora lo has quitado */}
      </header>

      <section className="banner">
        <h2>Bienvenido a nuestra tienda</h2>
        <p>Encuentra los mejores productos aquí</p>
        {/* Puedes agregar más contenido como botones de acción o enlaces */}
      </section>
    </div>
  );
};

export default Home;

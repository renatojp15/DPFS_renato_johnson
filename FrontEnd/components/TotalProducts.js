// Ejemplo en TotalProducts.js
import React, { useState, useEffect } from 'react';
import '../src/Dashboard.css';  // Importa el archivo de estilos
import axios from 'axios';

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setTotalProducts(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching total products:', error);
      });
  }, []);

  return (
    <div className="panel">
      <h2>Total Products</h2>
      <p>{totalProducts}</p>
    </div>
  );
};

export default TotalProducts;
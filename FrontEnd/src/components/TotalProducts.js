// Ejemplo en TotalProducts.js
import React, { useState, useEffect } from 'react';

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
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
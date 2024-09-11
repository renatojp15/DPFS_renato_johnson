// Ejemplo en TotalProducts.js
import React, { useState, useEffect } from 'react';

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setTotalProducts(data.count))
      .catch(error => console.error('Error fetching total users:', error));
  }, []);

  return (
    <div className="panel">
      <h2>Total Products</h2>
      <p>{totalProducts}</p>
    </div>
  );
};

export default TotalProducts;
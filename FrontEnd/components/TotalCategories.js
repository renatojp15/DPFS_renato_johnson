import React, { useEffect, useState } from 'react';
import '../public/stylesheets/Dashboard.css';  // Importa el archivo de estilos

function TotalCategories() {
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setTotalCategories(data.count))
      .catch(error => console.error('Error fetching total categories:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total de Categorías</h5>
        <p className="card-text">{totalCategories}</p>
      </div>
    </div>
  );
}

export default TotalCategories;

import React, { useEffect, useState } from 'react';

function TotalUsers() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(response => response.json())
      .then(data => setTotalUsers(data.count))
      .catch(error => console.error('Error fetching total users:', error));
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total de Usuarios</h5>
        <p className="card-text">{totalUsers}</p>
      </div>
    </div>
  );
}

export default TotalUsers;

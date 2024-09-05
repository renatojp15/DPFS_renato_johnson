import React from 'react';
import TotalProducts from './TotalProducts';
import TotalUsers from './TotalUsers';

function Dashboard() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <TotalProducts />
          </div>
          <div className="col-md-4">
            <TotalUsers />
          </div>
        </div>
        {}
      </div>
    );
  }
  
  export default Dashboard;
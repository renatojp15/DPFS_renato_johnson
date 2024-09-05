import React from 'react';
import TotalProducts from '../components/TotalProducts';
import TotalUsers from '../components/TotalUsers';
import '../src/Dashboard.css';  // Importa el archivo de estilos
import LastCreatedDetail from './LastCreatedDetail';
import CategoriesPanel from './CategoriesPanel';
import ProductList from './ProductList';

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
          <div className="col-md-4">
            <TotalCategories />
          </div>
        </div>
        {}
      </div>
    );
  }
  
  export default Dashboard;
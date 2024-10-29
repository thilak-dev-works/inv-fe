// src/components/Sidebar.js
import React from 'react';
import '../styles/Sidebar.css';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 onClick={() => { navigate('/') }}>Honeycomb</h2>
        <p>Inventory Management</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li onClick={() => { navigate('/dash') }}>Dashboard</li>
          <li onClick={() => { navigate('/allproducts') }}>All Products</li>
          <li>Stock Adjustments</li>
          <li>Product Requests</li>
          <li>Sold-Out Products</li>
          <li>Deleted Products</li>
          <li>Reports</li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <p>Olivia Rhye</p>
        <p>olivia@untitledui.com</p>
      </div>
    </aside>
  );
};

export default Sidebar;

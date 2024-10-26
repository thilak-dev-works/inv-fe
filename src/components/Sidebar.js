// src/components/Sidebar.js
import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>honeycomb</h2>
        <p>Inventory Management</p>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>Dashboard</li>
          <li>All Products</li>
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

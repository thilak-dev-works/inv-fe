// src/App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './styles/main.css';
import Layout from './components/layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Dash from './pages/dash';
import AllProducts from './pages/allproducts';


// function App() {
//   return (
//     <div className="app-container">
//       <Sidebar />
//       <Dashboard />
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dash' element={<Dash />} />
          <Route path='/allproducts' element={<AllProducts />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppContent from './AppContent';

function App() {
  return (
    <Router>
      <AppWithNavbar />
    </Router>
  );
}

function AppWithNavbar() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';
  const showFooter = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <AppContent />
      {showFooter && <Footer />}
    </>
  );
}

export default App;

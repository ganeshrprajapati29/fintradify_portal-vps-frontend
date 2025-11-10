import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import './Navbar.css'; // We'll create this CSS file

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo on the left */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="https://via.placeholder.com/40x40?text=F" // Placeholder logo; replace with actual Fintradify logo URL
            alt="Fintradify Logo"
            className="me-2"
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          <span className="fw-bold text-success">Fintradify</span>
        </Link>

        {/* Marquee in the center */}
        <div className="navbar-marquee flex-grow-1 text-center">
          <marquee behavior="scroll" direction="left" className="text-muted fw-semibold">
            Welcome to Fintradify HR Portal - Simplifying Workforce Management
          </marquee>
        </div>

        {/* Login button on the right */}
        <div className="d-flex">
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={handleLoginClick}
          >
            <FaSignInAlt className="me-2" />
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

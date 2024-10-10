import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, username, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>Restaurant Customer Management</h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>Welcome, {username}</li>
            <li><Link to="/add">Add Customer</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
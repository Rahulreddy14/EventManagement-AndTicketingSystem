// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTicketAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-xl font-bold">
          <FaTicketAlt className="mr-2" />
          Eventify
        </Link>
        <div>
          {auth.token ? (
            <>
              <Link to="/dashboard" className="mr-4 hover:text-gray-400">Dashboard</Link>
              <Link to="/create-event" className="mr-4 hover:text-gray-400">Create Event</Link>
              <Link to="/profile" className="mr-4 hover:text-gray-400">Profile</Link>
              <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4 hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

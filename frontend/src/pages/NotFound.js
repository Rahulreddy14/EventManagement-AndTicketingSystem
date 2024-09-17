// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="mb-4">The page you're looking for does not exist.</p>
      <Link to="/" className="text-blue-500">Go back to Home</Link>
    </div>
  );
};

export default NotFound;

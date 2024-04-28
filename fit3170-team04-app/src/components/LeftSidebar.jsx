import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

const LeftSidebar = () => {
  return (
    <div
      className="h-full bg-blue-600 text-white w-64 fixed top-0 left-0 overflow-y-auto transition-all duration-300 ml-0"
    >
      <div className="p-4">
        {/* Logo */}
        <img src={logo} alt="Logo" className="mb-4" />

        {/* Sidebar Title */}
        <h2 className="text-lg font-semibold mb-4">Sidebar</h2>

        {/* Links */}
        <ul className="space-y-2">
          {/* Homepage Link */}
          <li>
            <Link
              to="/"
              className="block text-sm py-2 px-4 hover:bg-blue-700 rounded transition duration-200"
            >
              Home
            </Link>
          </li>

          {/* Profile Link */}
          <li>
            <Link
              to="/profile"
              className="block text-sm py-2 px-4 hover:bg-blue-700 rounded transition duration-200"
            >
              Profile
            </Link>
          </li>

          {/* Admin Page Link */}
          <li>
            <Link
              to="/admin"
              className="block text-sm py-2 px-4 hover:bg-blue-700 rounded transition duration-200"
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
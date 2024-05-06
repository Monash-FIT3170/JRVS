import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

const LeftSidebar = () => {
  return (
    <div
      className="h-full bg-gradient-to-b from-blue-700 to-blue-900 text-white w-48 fixed top-0 left-0 overflow-y-auto transition-all duration-300 ml-0"
    >
      <div className="p-4">
        {/* Logo */}
        <img src={logo} alt="Logo" className="mb-4" />

        {/* Links */}
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className="block text-sm py-2 px-4 hover:bg-blue-900 rounded transition duration-200"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/lesson"
              className="block text-sm py-2 px-4 hover:bg-blue-900 rounded transition duration-200"
            >
              Lesson
            </Link>
          </li>

          <li>
            <Link
              to="/quiz"
              className="block text-sm py-2 px-4 hover:bg-blue-900 rounded transition duration-200"
            >
              Quiz
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="block text-sm py-2 px-4 hover:bg-blue-900 rounded transition duration-200"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LeftSidebar;
/**
 * @file LeftSidebar Component
 *
 * @description A vertical sidebar that provides navigation links to different sections of the application. The sidebar is styled with a gradient background and contains links to:
 * - Home
 * - Learning Path
 * - Lesson
 * - Quiz
 * - Profile
 *
 * The sidebar is fixed on the left side of the screen and features smooth transitions for hover effects.
 *
 * @module LeftSidebar
 * @requires react
 * @requires react-router-dom
 *
 * @returns {JSX.Element} The rendered sidebar with navigation links and logo.
 */

import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/Logo.png";

const LeftSidebar = () => {
  return (
    <div className="h-full bg-gradient-to-b from-blue-700 to-blue-900 text-white w-48 fixed top-0 left-0 overflow-y-auto transition-all duration-300 ml-0">
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
              to="/learningPath"
              className="block text-sm py-2 px-4 hover:bg-blue-900 rounded transition duration-200"
            >
              Learning Path
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

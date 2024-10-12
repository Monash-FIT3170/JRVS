/**
 * @file ProtectedRoute Component
 *
 * @description A route guard that protects routes from unauthorized access.
 * If the user is authenticated based on the presence and validity of a JWT token,
 * it renders the child routes. Otherwise, it redirects the user to the login page.
 *
 * @module ProtectedRoute
 * @requires react
 * @requires react-router-dom
 * @requires jwt-decode
 *
 * @returns {JSX.Element} The rendered component, which either shows child routes or redirects to login.
 */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
        localStorage.removeItem("token");
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const { exp } = jwtDecode(token);
      if (exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoute;
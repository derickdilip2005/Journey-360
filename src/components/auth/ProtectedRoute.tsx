import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated
  const isAuthenticated = () => {
    // Check for auth token in localStorage or sessionStorage
    // We check for both 'adminAuthToken' and 'authToken' since there are two login pages
    return (
      localStorage.getItem('adminAuthToken') !== null ||
      sessionStorage.getItem('adminAuthToken') !== null ||
      localStorage.getItem('authToken') !== null ||
      sessionStorage.getItem('authToken') !== null
    );
  };

  // If not authenticated, redirect to login page
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
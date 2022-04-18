import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
      const { loading, isAuthenticated } = useSelector((state) => state.user);

      if (loading) return null;

      return isAuthenticated
            ? children
            : <Navigate to="/login" replace />;
};
export default ProtectedRoute; 
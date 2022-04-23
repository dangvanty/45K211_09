import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRouteAdmin = ({ children}) => {
      const { loading, user} = useSelector((state) => state.user);

      if (loading) return null;
     
      
      return user.role ==="admin"
            ? children
            : <Navigate to="/login" />;
    
      
};
export default ProtectedRouteAdmin; 
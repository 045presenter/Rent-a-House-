import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { LOGIN_PATH } from '@/config/subscriptionRoutes.js';

export default function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  if (requiredRole && currentUser?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
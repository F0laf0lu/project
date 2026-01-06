import { useAuth } from '../contexts/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { isTokenExpired } from '../utils/utils';
import { useEffect } from 'react';


const ProtectedRoute = ({ children }) => {
  const { authUser, isAuthenticated, loading, logout} = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }



  
  if (!isAuthenticated || !authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default ProtectedRoute
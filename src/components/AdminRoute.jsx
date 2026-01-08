import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
    const { admin, loading } = useContext(AuthContext);

    if (loading) {
        return null;
    }

    
    return admin && admin.role === 'admin' ? children : <Navigate to="/admin/login" />;
};

export default AdminRoute;

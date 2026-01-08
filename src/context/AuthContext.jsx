import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logoutUser();
        } else {
          setUser(decoded);
        }
      } catch (error) {
        logoutUser();
      }
    }

    
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      try {
        const decoded = jwtDecode(adminToken);
        if (decoded.exp * 1000 < Date.now()) {
          logoutAdmin();
        } else {
          setAdmin(decoded);
        }
      } catch (error) {
        logoutAdmin();
      }
    }

    setLoading(false);
  }, []);

  const loginUser = (token, userData, redirectPath = '/') => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    navigate(redirectPath);
  };

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
  };

  const loginAdmin = (token, adminData, redirectPath = '/admin') => {
    localStorage.setItem("adminToken", token);
    const decoded = jwtDecode(token);
    setAdmin(decoded);
    navigate(redirectPath);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, admin, loginUser, logoutUser, loginAdmin, logoutAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

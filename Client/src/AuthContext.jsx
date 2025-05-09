import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, checkIsAdmin } from './api/auth';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const storedUser = Cookies.get('user');

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      checkAdminStatus();
    }
    
    setLoading(false);
  }, []);

  const checkAdminStatus = async () => {
    try {
      const isUserAdmin = await checkIsAdmin();
      setIsAdmin(isUserAdmin);
    } catch (error) {
      setIsAdmin(false);
    }
  };

  const updateAuthStatus = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      await checkAdminStatus();
    } catch (error) {
      setUser(null);
      setIsAdmin(false);
      Cookies.remove('token');
      Cookies.remove('user');
    }
  };

  const value = {
    user,
    isAdmin,
    loading,
    updateAuthStatus,
    setUser: (userData) => {
      setUser(userData);
      if (userData) {
        checkAdminStatus();
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

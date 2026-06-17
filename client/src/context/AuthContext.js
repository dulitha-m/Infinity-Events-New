import { createContext, useContext, useState, useEffect } from 'react';
import { adminLogin, adminVerify } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('infinity_token');
    if (token) {
      adminVerify()
        .then(({ data }) => { if (data.valid) setAdmin(data.admin); })
        .catch(() => localStorage.removeItem('infinity_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const { data } = await adminLogin({ email, password });
    localStorage.setItem('infinity_token', data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('infinity_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

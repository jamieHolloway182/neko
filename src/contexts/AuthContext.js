import React, { createContext, useState, useEffect } from "react";
import { apiPost } from "../api/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await apiPost('/login', credentials);
      const t = res?.token || res?.access_token || res?.data?.token || null;
      if (t) {
        localStorage.setItem('token', t);
        setToken(t);
      }
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const credsRaw = localStorage.getItem('auth_credentials');
    if (!token && credsRaw) {
      try {
        const creds = JSON.parse(credsRaw);
        if (creds && creds.email && creds.password) {
          // attempt auto-login; ignore errors
          login({ email: creds.email, password: creds.password }).catch(() => {});
        }
      } catch (e) {
        // ignore parse errors
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

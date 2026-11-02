import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("admin_v2_token") || null);
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem("admin_v2_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isValidating, setIsValidating] = useState(true);

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setIsValidating(false);
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKENDLINK}/api/admin/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        if (res.data.success) {
          setAdminUser(res.data.user);
        } else {
          logout();
        }
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post(`${import.meta.env.VITE_BACKENDLINK}/api/admin/login`, {
      username,
      password,
    });

    if (res.data.success && res.data.token) {
      setToken(res.data.token);
      setAdminUser({ username: res.data.username });
      localStorage.setItem("admin_v2_token", res.data.token);
      localStorage.setItem("admin_v2_user", JSON.stringify({ username: res.data.username }));
      return res.data;
    }
    throw new Error(res.data.message || "Login failed");
  };

  const logout = () => {
    setToken(null);
    setAdminUser(null);
    localStorage.removeItem("admin_v2_token");
    localStorage.removeItem("admin_v2_user");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        token,
        adminUser,
        isAuthenticated: !!token,
        isValidating,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}


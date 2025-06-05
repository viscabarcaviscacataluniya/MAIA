import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth"; // Update to your Django server

export const useAuth = () => {
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      return true;
    } catch (err) {
      setError("Invalid username or password");
      return false;
    }
  };

  const register = async (username, email, password, password2) => {
    try {
      await axios.post(`${API_URL}/register/`, {
        username,
        email,
        password,
        password2,
      });
      return true;
    } catch (err) {
      setError(err.response.data);
      return false;
    }
  };

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      await axios.post(`${API_URL}/logout/`, { refresh });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.clear();
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  return { login, logout, register, isAuthenticated, error };
};

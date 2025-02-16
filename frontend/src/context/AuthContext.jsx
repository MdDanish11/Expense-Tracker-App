import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user details when app loads
  const fetchUser = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched user:", response.data.user); // Debugging
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });

      console.log("Login Response:", response.data); // Debugging

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);

      window.location.href = "/dashboard"; // Redirect to Dashboard
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials");
    }
  };

  // ✅ Fixed: Store token & fetch user after signup
  const signup = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", { username, password });

      console.log("Signup Response:", response.data); // Debugging

      localStorage.setItem("token", response.data.token);
      fetchUser(); // Fetch user immediately
      window.location.href = "/dashboard"; // Redirect after signup
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
    }
  };

  // ✅ Fixed logout to clear everything
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirect after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

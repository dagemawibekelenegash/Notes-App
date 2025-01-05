import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

// Component to protect routes based on authentication
function ProtectedRoute({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null); // Track auth state

  // Check authentication when the component mounts
  useEffect(() => {
    auth().catch(() => setIsAuthorized(false)); // If auth fails, setUnauthorized
  }, []);

  // Refresh the access token if expired using the refresh token
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access); // Store new token
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  // Check if the access token is valid or expired
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false); // No token, not authorized
      return;
    }

    const decoded = jwtDecode(token); // Decode token to check expiration
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000; // Current time in seconds
    if (tokenExpiration < now) {
      await refreshToken(); // If expired, refresh token
    } else {
      setIsAuthorized(true); // Token is valid, set authorized
    }
  };

  // Show loading while determining authorization status
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // If authorized, render children, else redirect to login
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

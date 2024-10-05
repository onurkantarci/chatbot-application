import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/PrivateRoute.css";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:3000/session/chat", {
          method: "GET",
          credentials: "include",
        });

        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error("Error checking session:", error);
        setIsAuthenticated(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Please wait...</p>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;

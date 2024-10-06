import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/PublicRoute.css";
import SessionService from "../services/session.service";

interface PublicRouteProps {
  element: JSX.Element;
}

const PublicRoute = ({ element }: PublicRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await SessionService.checkSession();

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

  return isAuthenticated ? <Navigate to="/chat" /> : element;
};

export default PublicRoute;

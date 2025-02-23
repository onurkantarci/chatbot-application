import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../styles/PrivateRoute.css";
import SessionService from "../services/session.service";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await SessionService.checkSession();

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
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

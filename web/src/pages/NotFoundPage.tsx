import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFoundPage.css";

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

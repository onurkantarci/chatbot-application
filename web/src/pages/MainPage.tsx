import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

const MainPage: React.FC = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleButtonClick = async () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (name.trim() && nameRegex.test(name)) {
      try {
        const response = await fetch("http://localhost:3000/session/set-name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
          credentials: "include",
        });

        if (response.ok) {
          navigate("/chat");
        } else {
          setError("Failed to store session");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Something went wrong.");
      }
    } else {
      setError("Please enter a valid name (only letters).");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <div>
      <div className="container">
        <div className="input-button-wrapper">
          <input
            type="text"
            className="name-input"
            placeholder="Enter your name"
            maxLength={50}
            value={name}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="submit-btn" onClick={handleButtonClick}>
            Enter
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default MainPage;

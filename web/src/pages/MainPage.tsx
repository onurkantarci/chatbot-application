import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import SessionService from "../services/session.service";

const MainPage = () => {
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
        const response = await SessionService.startSession(name);

        if (response.ok) {
          navigate("/chat", { state: { userName: name } });
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to store session");
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
    <div className="container">
      <h1 className="title">Welcome Stranger!</h1>
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
  );
};

export default MainPage;

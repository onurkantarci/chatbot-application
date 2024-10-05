import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEndSession = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/session/end-session",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Session ended successfully");
        navigate("/");
      } else {
        console.error("Failed to end session");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:3000/session/chat", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const text = await response.text();
          setMessage(text);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      }
    };

    checkSession();
  }, [navigate]);

  return (
    <div className="container">
      <button onClick={handleEndSession}>END SESSION</button>
    </div>
  );
};

export default ChatPage;

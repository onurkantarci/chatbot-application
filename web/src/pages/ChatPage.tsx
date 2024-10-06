import "../styles/ChatPage.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Message, { AIRole, MessageSender } from "../models/message";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import SessionService from "../services/session.service";
import AIService from "../services/ai.service";
import OpenAICompletionResponse from "../models/openai";

const ChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    processMessageToChatGPT([]);
  }, []);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      message: messageInput,
      sender: MessageSender.USER,
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setMessageInput("");

    try {
      await SessionService.saveMessage({
        role: AIRole.USER,
        content: messageInput,
      });
    } catch (error) {
      console.error("Error while saving message:", error);
    }

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: Message[]) {
    const messagesToGpt: unknown[] = [];

    const systemMessage = {
      role: AIRole.SYSTEM,
      content:
        `You are a charming cat enthusiast chatbot` +
        ` Your main objective is to ask whimsical and amusing questions about cats,` +
        ` ensuring the conversation is light-hearted and fun. When a user connects to the chat,` +
        ` start with a warm greeting that reflects your love for cats, and then pose a random,` +
        ` question about cats to kick off the conversation. Keep your responses less than 2 sentences,` +
        ` including additional fun questions to keep the dialogue flowing.` +
        ` Remember to stay in character as the ultimate cat lover throughout the chat! Only ask one question at a time!`,
    };

    messagesToGpt.push(systemMessage);

    if (chatMessages.length) {
      const m = chatMessages
        .map((messageObject) => {
          if (!messageObject.message) return;
          const role =
            messageObject.sender === MessageSender.CHAT_ASSISTANT
              ? AIRole.ASSISTANT
              : AIRole.USER;
          return { role: role, content: messageObject.message };
        })
        .filter((mess) => mess);

      messagesToGpt.push(...m);
    }

    try {
      const response = await AIService.chatCompletion(messagesToGpt);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: OpenAICompletionResponse = await response.json();

      if (data.choices && data.choices.length > 0) {
        const { message } = data.choices[0];
        const chatGptMessage = message.content;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: chatGptMessage,
            sender: MessageSender.CHAT_ASSISTANT,
          },
        ]);
        try {
          await SessionService.saveMessage({
            role: message.role,
            content: message.content,
          });
        } catch (error) {
          console.error("Error while saving ChatGPT message:", error);
        }
      } else {
        console.error("No choices found in the response");
      }
    } catch (error) {
      console.error("Error while processing message:", error);
    }
  }

  const handleEndSession = async () => {
    try {
      const response = await SessionService.endSession();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <button onClick={handleEndSession} className="end-session-btn">
        Leave chat
      </button>
      <MessageList messages={messages} />
      <MessageInput
        inputValue={messageInput}
        onKeyDown={handleKeyDown}
        onInputChange={setMessageInput}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default ChatPage;

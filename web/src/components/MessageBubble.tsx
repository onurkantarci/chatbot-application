import { useLocation } from "react-router-dom";
import Message, { MessageSender } from "../models/message";

const MessageBubble = ({ message }: { message: Message }) => {
  const location = useLocation();
  const userName = location.state?.userName || "You";

  return (
    <div
      className={`chat-message ${
        message.sender === MessageSender.CHAT_ASSISTANT
          ? "chatgpt-message"
          : `${message.sender}-message`
      }`}
    >
      <span className="chat-user">
        {message.sender === MessageSender.USER
          ? userName
          : MessageSender.CHAT_ASSISTANT}
        :
      </span>
      <span className="chat-text">{message.message}</span>
    </div>
  );
};

export default MessageBubble;

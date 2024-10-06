import Message from "../models/message";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageBubble key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;

const MessageInput = ({
  inputValue,
  onKeyDown,
  onInputChange,
  onSubmit,
}: {
  inputValue: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onInputChange: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => Promise<void>;
}) => {
  return (
    <div className="chat-input">
      <input
        type="text"
        value={inputValue}
        onKeyDown={onKeyDown}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={onSubmit} className="send-btn">
        Send
      </button>
    </div>
  );
};

export default MessageInput;

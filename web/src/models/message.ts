export default interface Message {
  message: string;
  sender: MessageSender;
}

export enum MessageSender {
  USER = "user",
  CHAT_ASSISTANT = "Cat Assistant",
}

export enum AIRole {
  SYSTEM = "system",
  ASSISTANT = "assistant",
  USER = "user",
}

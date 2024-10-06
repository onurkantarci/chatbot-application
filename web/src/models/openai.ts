import { AIRole } from "./message";

export default interface OpenAICompletionResponse {
  choices: {
    message: OpenAIMessageResponse;
  }[];
}

export interface OpenAIMessageResponse {
  role: AIRole;
  content: string;
}

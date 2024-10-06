import BaseService from "./base.service";

class AIService extends BaseService {
  protected static baseUrl: string = process.env.REACT_APP_OPENAI_API_URL!;

  private static OPENAI_API_KEY: string = process.env.REACT_APP_OPENAI_API_KEY!;

  private static HEADERS = {
    Authorization: "Bearer " + this.OPENAI_API_KEY,
    "Content-Type": "application/json",
  };

  static chatCompletion(messagesToGPT: unknown[]) {
    return fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messagesToGPT,
      }),
    });
  }
}

export default AIService;

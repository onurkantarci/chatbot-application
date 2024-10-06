import { OpenAIMessageResponse } from "../models/openai";
import BaseService from "./base.service";

class SessionService extends BaseService {
  protected static baseUrl: string = process.env.REACT_APP_API_URL!;

  static startSession(name: string) {
    return fetch(`${this.baseUrl}/session/set-name`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      credentials: "include",
    });
  }

  static endSession() {
    return fetch(`${this.baseUrl}/session/end-session`, {
      method: "POST",
      credentials: "include",
    });
  }

  static checkSession() {
    return fetch(`${this.baseUrl}/session/chat`, {
      method: "GET",
      credentials: "include",
    });
  }

  static saveMessage(gptMessage: OpenAIMessageResponse) {
    return fetch(`${this.baseUrl}/session/save-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gptMessage),
      credentials: "include",
    });
  }
}

export default SessionService;

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    index: number;
    message: ChatMessage;
    finish_reason: string;
  }[];
}



export interface OpenRouterResponse {
  choices?: {
    message: {
      role: string;
      content: string;
    };
  }[];
  [key: string]: unknown;
}
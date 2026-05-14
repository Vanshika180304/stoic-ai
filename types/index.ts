export interface GuidanceContent {
  category: string;
  guidance: string;
  ancientInsight: string;
  reflection: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string | GuidanceContent;
  timestamp: Date;
  mode: 'conversation' | 'guidance';
}

export interface SessionState {
  messages: Message[];
  currentMode: 'conversation' | 'guidance';
  isLoading: boolean;
}

export interface AIConfig {
  provider: 'openai' | 'anthropic';
  model: string;
  apiKey: string;
  maxTokens: number;
  temperature: number;
}

export type Mode = 'conversation' | 'guidance';

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { Message, SessionState, Mode } from '@/types';

interface SessionContextType extends SessionState {
  addMessage: (message: Message) => void;
  setMode: (mode: Mode) => void;
  setLoading: (loading: boolean) => void;
  clearHistory: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState<Mode>('conversation');
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const setMode = (mode: Mode) => {
    setCurrentMode(mode);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const clearHistory = () => {
    setMessages([]);
  };

  return (
    <SessionContext.Provider
      value={{
        messages,
        currentMode,
        isLoading,
        addMessage,
        setMode,
        setLoading,
        clearHistory,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from '@/lib/session-context';
import MessageBubble from './MessageBubble';
import TextInput from './TextInput';
import Button from './Button';
import { Message, GuidanceContent } from '@/types';

export default function ChatInterface() {
  const { messages, currentMode, isLoading, addMessage, setLoading } = useSession();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      mode: currentMode,
    };

    addMessage(userMessage);
    setInputValue('');
    setLoading(true);

    try {
      if (currentMode === 'conversation') {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: inputValue,
            conversationHistory: messages,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(data.timestamp),
          mode: currentMode,
        };

        addMessage(assistantMessage);
      } else {
        const response = await fetch('/api/guidance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dilemma: inputValue,
            conversationHistory: messages,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get guidance');
        }

        const data = await response.json();

        const guidanceContent: GuidanceContent = {
          category: data.category,
          guidance: data.guidance,
          ancientInsight: data.ancientInsight,
          reflection: data.reflection,
        };

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: guidanceContent,
          timestamp: new Date(data.timestamp),
          mode: currentMode,
        };

        addMessage(assistantMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'The path to wisdom encounters obstacles. Please try again.',
        timestamp: new Date(),
        mode: currentMode,
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Messages area */}
      <div className="min-h-[400px] max-h-[600px] overflow-y-auto px-2 space-y-5">
        {messages.length === 0 && (
          <div className="text-center py-20 text-[var(--slate)] opacity-50">
            <p className="text-xl italic font-light leading-relaxed" style={{ fontFamily: 'Crimson Pro, serif', letterSpacing: '0.02em' }}>
              {currentMode === 'conversation'
                ? 'Speak, seeker. In silence, wisdom awaits.'
                : 'Utter your dilemma, as the timeless philosopher listens.'}
            </p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[var(--parchment-dark)]/80 backdrop-blur-sm px-8 py-5 rounded-sm border-2 border-[var(--bronze)]/30 shadow-[0_4px_16px_var(--shadow-soft)]">
              <p className="text-[var(--slate-dark)] italic animate-pulse font-light" style={{ fontFamily: 'Crimson Pro, serif' }}>
                Contemplating...
              </p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="space-y-3 mt-6">
        <TextInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSendMessage}
          placeholder={
            currentMode === 'conversation'
              ? 'Share your reflections...'
              : 'Describe your dilemma...'
          }
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
            {isLoading ? 'Contemplating...' : 'Send'}
          </Button>
        </div>
      </div>
    </div>
  );
}

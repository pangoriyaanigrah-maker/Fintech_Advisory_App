'use client';

import { useState } from 'react';
import type { ChatMessage } from '@/types';
import { chatPresets } from '@/lib/data/chat';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  sender: 'aura',
  text: 'Welcome back, Ananya. I have indexed your current Indian portfolio balance. How can I assist you with your wealth zen today?',
};

function resolveAnswer(text: string): string {
  const query = text.toLowerCase();

  if (chatPresets[text]) {
    return chatPresets[text];
  }

  // Predefined question chip mappings
  if (text === 'Direct vs regular funds') {
    return chatPresets['Explain direct vs regular mutual funds'];
  }
  if (text === 'How to rebalance surplus?') {
    return chatPresets['How to rebalance my ₹15k surplus?'];
  }

  // Keyword fallbacks
  if (query.includes('inflation') || query.includes('protect')) {
    return chatPresets['Am I inflation protected?'];
  }
  if (query.includes('direct') || query.includes('regular')) {
    return chatPresets['Explain direct vs regular mutual funds'];
  }
  if (query.includes('rebalance') || query.includes('surplus')) {
    return chatPresets['How to rebalance my ₹15k surplus?'];
  }

  return 'Checking advisor structures... Your query has been mapped against index thresholds. Aura suggests sticking to Direct SIP allocations to keep portfolio drag close to zero.';
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const delay = trimmed === text && chatPresets[trimmed] !== undefined ? 1000 : 1200;

    setTimeout(() => {
      const answer = resolveAnswer(trimmed);
      const auraMsg: ChatMessage = {
        id: `aura-${Date.now()}`,
        sender: 'aura',
        text: answer,
      };
      setMessages((prev) => [...prev, auraMsg]);
      setIsTyping(false);
    }, delay);
  }

  function clearChat() {
    setMessages([
      {
        id: `cleared-${Date.now()}`,
        sender: 'aura',
        text: 'Chat history flushed. Ask me anything about direct mutual investments, ELSS taxes, or goals!',
      },
    ]);
    setIsTyping(false);
  }

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    clearChat,
    isTyping,
  };
}

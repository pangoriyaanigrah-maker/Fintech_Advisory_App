'use client';

import { useEffect, useRef } from 'react';
import { CheckCircle2, RefreshCw, Send, Sparkles } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { PREDEFINED_QUESTIONS } from '@/lib/data/chat';
import { Container } from '@/components/layout/container';

export default function ChatInterface({ embedded = false }: { embedded?: boolean }) {
  const { messages, inputValue, setInputValue, sendMessage, clearChat, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      sendMessage(inputValue);
    }
  }

  const chatPanel = (
    <div className={`bg-[#0A261D] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/5 flex flex-col relative ${embedded ? 'h-[calc(100vh-220px)]' : 'h-[500px]'} ${embedded ? 'max-w-2xl mx-auto' : 'max-w-md mx-auto'}`}>

              {/* Ambient light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-container/10 rounded-full blur-2xl pointer-events-none" />

              {/* Header */}
              <div className="p-4 bg-primary-container/85 backdrop-blur-md border-b border-primary/20 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-tertiary-container/10 flex items-center justify-center border border-tertiary-container/40">
                    <Sparkles className="w-4 h-4 text-tertiary-container" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#B0F0D6]">
                      Aura Chatbot
                    </h4>
                    <p className="text-[9px] text-white/60">SEBI-Supervised Private Mentor</p>
                  </div>
                </div>
                <button
                  onClick={clearChat}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors"
                  title="Recycle Chat session"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4 text-left custom-scrollbar scroll-smooth">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'aura' && (
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md border border-white/5 shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-tertiary-container" />
                      </div>
                    )}
                    <div
                      className={
                        msg.sender === 'aura'
                          ? 'bg-white/10 text-white/95 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs leading-relaxed max-w-[80%] border border-white/5'
                          : 'bg-primary text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-xs leading-relaxed max-w-[80%] border border-primary/20'
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-start gap-2.5 justify-start">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-tertiary-container animate-spin" />
                    </div>
                    <div className="bg-white/10 text-white/50 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs font-semibold">
                      Aura is analyzing market patterns...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Predefined questions */}
              <div className="p-3 bg-primary-container/20 border-t border-primary/10 select-none z-10">
                <p className="text-[10px] text-white/40 uppercase tracking-widest text-left mb-1.5 font-bold">
                  Recommended Mentoring Topics
                </p>
                <div className="flex gap-2 overflow-x-auto pb-1 max-w-full text-nowrap scroll-smooth">
                  {PREDEFINED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="bg-[#051C15] hover:bg-[#082d22] transition-colors text-[10px] font-semibold text-white/90 py-1.5 px-3 rounded-lg border border-white/10 shrink-0"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-3 bg-primary-container/40 border-t border-primary/20 flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Aura about SIP, taxes, or compounding..."
                  className="flex-1 bg-white/5 border border-white/15 focus:outline-none focus:border-tertiary-container/70 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 transition"
                />
                <button
                  onClick={() => sendMessage(inputValue)}
                  className="p-2.5 bg-tertiary-container text-primary rounded-xl hover:bg-amber-400 transition flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

    </div>
  );

  if (embedded) {
    return (
      <div id="wellness">
        {chatPanel}
      </div>
    );
  }

  return (
    <section
      className="py-16 md:py-24 bg-surface-low grain-texture overflow-hidden"
      id="wellness"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: feature description */}
          <div className="lg:col-span-6 space-y-7 text-left">
            <span className="font-sans text-xs font-bold text-tertiary uppercase tracking-widest block">
              AI CONCIERGE CHAT
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-primary font-bold leading-tight">
              Your Custom Digital Financial Muse
            </h2>
            <p className="font-sans text-on-surface/70 text-base leading-relaxed max-w-lg">
              Unlock prompt, objective responses to your portfolios, SIP schedules, and SEBI
              compliance regulations through active conversational intelligence.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-tertiary-container shrink-0 mt-0.5" />
                <p className="text-on-surface/70 text-sm font-medium">
                  24/7 personal direct secure messaging framework.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-tertiary-container shrink-0 mt-0.5" />
                <p className="text-on-surface/70 text-sm font-medium">
                  Automatic index balancing analyses and tax calculations.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-tertiary-container shrink-0 mt-0.5" />
                <p className="text-on-surface/70 text-sm font-medium">
                  Deep structural support engineered specifically for modern Indian life scenarios.
                </p>
              </li>
            </ul>
          </div>

          {/* Right: chat UI */}
          <div className="lg:col-span-6">
            {chatPanel}
          </div>

        </div>
      </Container>
    </section>
  );
}

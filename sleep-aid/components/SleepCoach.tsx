import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { Message } from '../types';
import { getChatResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const SleepCoach: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'Good evening. I am Somnium. I can help you with anxiety, sleep scheduling, or relaxation. What is on your mind tonight?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getChatResponse(messages, input);
      const modelMsg: Message = { role: 'model', content: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px-24px)] pt-4">
        <header className="mb-4 flex items-center gap-3 border-b border-stone-800 pb-4">
            <div className="w-10 h-10 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center">
                <Bot size={20} className="text-orange-400" />
            </div>
            <div>
                <h1 className="font-medium text-stone-100">Somnium Coach</h1>
                <p className="text-xs text-stone-500">CBT-I & NSDR Support</p>
            </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 scrollbar-thin scrollbar-thumb-stone-800">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                        msg.role === 'user' 
                        ? 'bg-orange-900/80 text-orange-50 rounded-br-none border border-orange-900' 
                        : 'bg-stone-900 text-stone-300 rounded-bl-none border border-stone-800'
                    }`}>
                        <div className="text-sm leading-relaxed prose prose-invert prose-p:my-1 prose-ul:my-1 prose-strong:text-orange-200">
                            {msg.role === 'model' ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
                        </div>
                    </div>
                </div>
            ))}
            {loading && (
                <div className="flex justify-start">
                     <div className="bg-stone-900 p-4 rounded-2xl rounded-bl-none flex items-center gap-2 border border-stone-800">
                        <Loader2 size={14} className="animate-spin text-stone-500" />
                        <span className="text-stone-500 text-xs tracking-wider">THINKING...</span>
                     </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about sleep pressure, worry time, or deep rest..."
                className="w-full bg-stone-900/50 border border-stone-800 text-stone-200 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-stone-600 focus:bg-stone-900 transition-all placeholder:text-stone-600 text-sm"
            />
            <button 
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="absolute right-2 top-2 p-2 bg-stone-800 rounded-lg text-stone-400 hover:text-orange-400 hover:bg-stone-700 disabled:opacity-50 disabled:hover:text-stone-400 transition-colors"
            >
                <Send size={18} />
            </button>
        </div>
    </div>
  );
};

export default SleepCoach;
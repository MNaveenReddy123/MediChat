import React, { useState, useRef, useEffect } from 'react';
import { Send, LogOut } from 'lucide-react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { Auth } from './components/Auth';
import { supabase } from './lib/supabase';

function App() {
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your medical assistant. I can help you with medical questions and provide general health information. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/google/flan-t5-large',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_API}`,
          },
          body: JSON.stringify({
            inputs: `Answer this medical question in detail: ${input.trim()}`,
            parameters: {
              max_length: 200,
              temperature: 0.3,
              top_p: 0.9,
              do_sample: true
            }
          }),
        }
      );

      const data = await response.json();
      let botResponse = data[0]?.generated_text || "I'm sorry, I couldn't process that request.";
      
      if (botResponse.length < 20) {
        botResponse = "I apologize, but I need to provide accurate medical information. Could you please rephrase your question? Remember that while I can provide general medical information, you should always consult with a healthcare professional for specific medical advice.";
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error while processing your request. Please try asking your question again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-8 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-green-800">MediChat</h1>
              <span className="text-gray-400">|</span>
              <p className="text-sm text-gray-600">Your Personal Medical Assistant</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">Ask me about medical conditions, symptoms, and general health information</p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </header>

        <div className="flex-1 h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t bg-white p-4 flex gap-4 items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about medical conditions, symptoms, or health advice..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`rounded-lg px-4 py-2 flex items-center gap-2 ${
              isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            {isLoading ? 'Processing...' : 'Send'}
          </button>
        </form>

        <footer className="bg-white border-t py-3 px-6">
          <p className="text-xs text-gray-500 text-center">
            Disclaimer: This is an AI assistant providing general medical information. Always consult with a qualified healthcare professional for medical advice.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
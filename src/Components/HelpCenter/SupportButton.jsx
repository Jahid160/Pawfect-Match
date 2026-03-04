"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { FaWhatsapp, FaRobot, FaRegComment } from 'react-icons/fa';

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "🤖 I'm experiencing a problem. Contact our professional support team.",
      sender: 'bot', 
      time: new Date().toLocaleTimeString()
    }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: Date.now(), text: inputValue, sender: 'user', time: currentTime };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      const botReply = { 
        id: Date.now() + 1, 
        // text: "ধন্যবাদ! Pawfect সাপোর্ট টিম শীঘ্রই আপনার সাথে যোগাযোগ করবে।", 
        text: JSON.stringify(`🤖 I'm experiencing a problem. Contact our professional support team 
        01829972560(WhatsApp)
        ⏰ 24/7 support`),
        sender: 'bot', 
        time: currentTime 
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[340px] md:w-[380px] bg-white rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100"
          >
            {/* Header: Gradient exactly like screenshot */}
            <div className="bg-gradient-to-r from-[#ff5b5b] via-[#d63384] to-[#b042ff] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                    <FaRobot className="text-white text-2xl" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-[#d63384] rounded-full"></span>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg leading-tight">PawFect Support</h3>
                  <p className="text-[11px] opacity-90">● Online • 24/7 support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="h-[400px] overflow-y-auto p-4 bg-gray-50/50 flex flex-col gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.sender === 'user' 
                    ? 'bg-linear-to-br from-[#ff5b5b] to-[#d63384] text-white rounded-tr-none font-bold' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                    {msg.sender === 'bot' && msg.id === 1 && (
                      <div className="mt-3 space-y-1 font-medium">
                        <p className="flex items-center gap-2 text-pink-600">
                          <FaWhatsapp /> 01829972560(WhatsApp)
                        </p>
                        <p className="text-gray-500 text-xs">⏰ 24/7 support</p>
                      </div>
                    )}
                    {msg.sender === 'user' && <div className="mt-1 text-right text-[10px] opacity-70">{msg.time}</div>}
                  </div>
                  {msg.sender === 'bot' && <span className="text-[10px] text-gray-400 mt-1 ml-1">{msg.time}</span>}
                </div>
              ))}
            </div>

            {/* Footer Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="write your question... 💬" 
                  className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-pink-400 text-gray-800"
                />
                <button type="submit" className={`shrink-0 w-12 h-12 ${!inputValue?"bg-linear-to-r from-[#ff9a9e] to-[#fecfef]": "bg-linear-to-r from-[#ff5b5b] via-[#d63384] to-[#b042ff]"} rounded-2xl flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity`}>
                  <Send size={20} className="rotate-45 -translate-y-0.5" />
                </button>
              </form>
              <div className="flex justify-center gap-4 mt-3 text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
                 <span>⚡ fast response</span>
                 <span>🔒 sequere chat</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-16 w-16 flex items-center justify-center rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Animated Background */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isOpen ? 'bg-gray-800' : 'bg-linear-to-br from-[#ff5b5b] via-[#d63384] to-[#b042ff]'
        }`} />
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-2xl bg-white/20 animate-ping opacity-75" />
        )}

        <div className="relative z-10 text-white">
          {isOpen ? (
            <X size={30} />
          ) : (
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <FaRegComment size={32} />
            </motion.div>
          )}
        </div>
      </motion.button>
    </div>
  );
}
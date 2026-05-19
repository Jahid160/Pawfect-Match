"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { FaWhatsapp, FaRobot, FaRegComment } from "react-icons/fa";

export default function SupportButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🤖 I'm experiencing a problem. Contact our professional support team.",
      sender: "bot",
      time: "",
    },
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === 1
          ? {
              ...msg,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : msg,
      ),
    );
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: "🤖 I'm experiencing a problem. Contact our professional support team. \n01829972560 (WhatsApp) \n⏰ 24/7 support",
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="right-6 bottom-6 z-[9999] fixed flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="flex flex-col bg-white shadow-2xl mb-4 border border-gray-100 rounded-[1.5rem] w-[340px] md:w-[380px] overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-orange-500 p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex justify-center items-center bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl w-12 h-12">
                    <FaRobot className="text-white text-2xl" />
                  </div>
                  <span className="right-0 bottom-0 absolute bg-green-400 border-2 border-orange-500 rounded-full w-3.5 h-3.5"></span>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg leading-tight">
                    PawFect Support
                  </h3>
                  <p className="opacity-90 text-[11px]">
                    ● Online • 24/7 support
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Body */}
            <div
              ref={scrollRef}
              className="flex flex-col gap-4 bg-gray-50/50 p-4 h-[400px] overflow-y-auto"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-orange-500 text-white rounded-tr-none font-bold"
                        : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                    {msg.sender === "bot" && msg.id === 1 && (
                      <div className="space-y-1 mt-3 font-medium">
                        <p className="flex items-center gap-2 text-orange-600">
                          <FaWhatsapp /> 01829972560(WhatsApp)
                        </p>
                        <p className="text-gray-500 text-xs">⏰ 24/7 support</p>
                      </div>
                    )}
                    {msg.sender === "user" && msg.time && (
                      <div className="opacity-70 mt-1 text-[10px] text-right">
                        {msg.time}
                      </div>
                    )}
                  </div>
                  {msg.sender === "bot" && msg.time && (
                    <span className="mt-1 ml-1 text-[10px] text-gray-400">
                      {msg.time}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Footer Input */}
            <div className="bg-white p-4 border-gray-100 border-t">
              <form
                onSubmit={handleSendMessage}
                className="relative flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="write your question... 💬"
                  className="bg-white px-5 py-3 border border-gray-200 focus:border-pink-400 rounded-2xl focus:outline-none w-full text-gray-800 text-sm"
                />
                <button
                  type="submit"
                  className={`shrink-0 w-12 h-12 ${!inputValue ? "bg-orange-500" : "bg-orange-600"} rounded-2xl flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity`}
                >
                  <Send size={20} className="rotate-45 -translate-y-0.5" />
                </button>
              </form>
              <div className="flex justify-center gap-4 mt-3 font-medium text-[10px] text-gray-400 uppercase tracking-tighter">
                <span>⚡ fast response</span>
                <span>🔒 secure chat</span>
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
        className="relative flex justify-center items-center shadow-xl rounded-2xl w-16 h-16 overflow-hidden"
      >
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            isOpen
              ? "bg-gray-800"
              : "bg-gradient-to-br from-[#ff5b5b] via-[#d63384] to-[#b042ff]"
          }`}
        />

        {!isOpen && (
          <span className="absolute inset-0 bg-white/20 opacity-75 rounded-2xl animate-ping" />
        )}

        <div className="z-10 relative text-white">
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

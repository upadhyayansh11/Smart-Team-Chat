import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);
const SparklesIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9 1.9 5.8 1.9-5.8 5.8-1.9-5.8-1.9z" />
  </svg>
);

const pageVariants = {
  initial: { opacity: 0, x: 300 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: { opacity: 0, x: -300, transition: { duration: 0.2 } },
};

export default function ChatWindowScreen({ chat, onBack, onSendMessage }) {
  const [summary, setSummary] = useState("");
  const [smartReply, setSmartReply] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSummarize = () => {
    setSmartReply("");
    setSummary(
      "AI Summary: This conversation is about the final review and staging deployment for Project Alpha."
    );
  };
  const handleSmartReply = () => {
    setSummary("");
    setSmartReply("Sounds good, looking forward to it!");
  };
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(chat.id, newMessage.trim());
      setNewMessage("");
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full w-full absolute flex flex-col"
    >
      <header className="p-4 border-b border-gray-200 bg-white flex items-center sticky top-0 flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 mr-2"
        >
          <ArrowLeftIcon />
        </button>
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-white font-bold">
          {chat.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-lg font-bold text-gray-800">{chat.name}</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-2xl max-w-sm ${
                msg.sender === "You"
                  ? "bg-indigo-500 text-white rounded-br-lg"
                  : "bg-gray-200 text-gray-800 rounded-bl-lg"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {(summary || smartReply) && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="p-3 bg-indigo-100 text-indigo-800 rounded-lg text-sm relative">
            <SparklesIcon className="w-4 h-4 absolute top-2 right-2 text-indigo-500" />
            <p>{summary || `Suggested Reply: "${smartReply}"`}</p>
          </div>
        </div>
      )}
      <footer className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2 mb-3">
          <button
            onClick={handleSummarize}
            className="flex items-center gap-2 text-sm px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 text-gray-700"
          >
            <SparklesIcon className="w-4 h-4 text-indigo-500" /> Summarize
          </button>
          <button
            onClick={handleSmartReply}
            className="flex items-center gap-2 text-sm px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100 text-gray-700"
          >
            <SparklesIcon className="w-4 h-4 text-indigo-500" /> Smart Reply
          </button>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send
          </button>
        </div>
      </footer>
    </motion.div>
  );
}

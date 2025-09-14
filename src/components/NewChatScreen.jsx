import React, { useState } from "react";
import { motion } from "framer-motion";

const dummyIcebreakers = [
  "Hey! I saw we're both working on the new project. Excited to collaborate! What part are you most looking forward to?",
  "Hi there! Just wanted to introduce myself. Let me know if you need a hand with anything as we get started.",
  "Hello! Hope you're having a great week. I'm looking forward to working together. What's been the most interesting challenge for you so far?",
];

const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
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

export default function NewChatScreen({ onBack, onStartChat }) {
  const [name, setName] = useState("");
  const [icebreaker, setIcebreaker] = useState("");

  const handleGenerateIcebreaker = () => {
    const randomIndex = Math.floor(Math.random() * dummyIcebreakers.length);
    setIcebreaker(dummyIcebreakers[randomIndex]);
  };

  const handleStart = () => {
    if (name.trim()) {
      onStartChat(name.trim(), icebreaker);
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
        <h2 className="text-lg font-bold text-gray-800">New Chat</h2>
      </header>
      <div className="flex-1 p-6 space-y-6 bg-gray-50">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Participant Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name or email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="text-center">
          <button
            onClick={handleGenerateIcebreaker}
            className="flex items-center justify-center gap-2 text-sm px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 text-gray-700 mx-auto"
          >
            <SparklesIcon className="w-4 h-4 text-indigo-500" /> Generate
            Icebreaker
          </button>
        </div>
        {icebreaker && (
          <div className="p-3 bg-indigo-100 text-indigo-800 rounded-lg text-sm relative mt-4">
            <SparklesIcon className="w-4 h-4 absolute top-2 right-2 text-indigo-500" />
            <p className="font-semibold mb-1">Suggested Message:</p>
            <p>"{icebreaker}"</p>
          </div>
        )}
      </div>
      <footer className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className="w-full px-4 py-2.5 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          Start Chat
        </button>
      </footer>
    </motion.div>
  );
}

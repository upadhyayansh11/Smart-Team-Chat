import React from "react";
import { motion } from "framer-motion";

const PlusIcon = () => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
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

export default function ChatListScreen({ chats, onSelectChat, onNewChat }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full w-full absolute flex flex-col"
    >
      <header className="p-4 border-b border-gray-200 bg-white flex justify-between items-center sticky top-0 flex-shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">Chats</h1>
        <button
          onClick={onNewChat}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
        >
          <PlusIcon />
        </button>
      </header>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex-shrink-0 mr-4 flex items-center justify-center text-white font-bold text-lg">
              {chat.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-md font-semibold text-gray-800 truncate">
                  {chat.name}
                </p>
                <p className="text-xs text-gray-500 flex-shrink-0 ml-2">
                  {chat.time}
                </p>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

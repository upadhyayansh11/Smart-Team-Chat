import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import ChatListScreen from "./components/ChatListScreen.jsx";
import ChatWindowScreen from "./components/ChatWindowScreen.jsx";
import NewChatScreen from "./components/NewChatScreen.jsx";

const initialChats = [
  {
    id: 1,
    name: "Project Alpha Team",
    lastMessage: "Great, let’s sync up tomorrow at 10 AM.",
    time: "10:42 AM",
    messages: [
      {
        id: 1,
        sender: "You",
        text: "Hey team, I've pushed the latest updates to the main branch.",
      },
      { id: 2, sender: "Alice", text: "Thanks! I'll review it now." },
      {
        id: 3,
        sender: "Bob",
        text: "Looks good on my end. The new component is rendering perfectly.",
      },
      {
        id: 4,
        sender: "You",
        text: "Excellent. Any blockers for the release?",
      },
      {
        id: 5,
        sender: "Alice",
        text: "None from my side. I think we are good to go for the staging deployment.",
      },
      {
        id: 6,
        sender: "Bob",
        text: "Agreed. I've already run the integration tests.",
      },
      { id: 7, sender: "You", text: "Great, let’s sync up tomorrow at 10 AM." },
    ],
  },
  {
    id: 2,
    name: "Marketing Sync",
    lastMessage: "Can you send over the new ad creatives?",
    time: "9:15 AM",
    messages: [
      {
        id: 1,
        sender: "Charlie",
        text: "The campaign performance is up 15% this week!",
      },
      {
        id: 2,
        sender: "You",
        text: "That's fantastic news. What's the plan for next week?",
      },
      {
        id: 3,
        sender: "Charlie",
        text: "We're launching the new video series. Can you send over the new ad creatives?",
      },
    ],
  },
  {
    id: 3,
    name: "Alice Smith",
    lastMessage: "Perfect, see you then!",
    time: "Yesterday",
    messages: [
      {
        id: 1,
        sender: "You",
        text: "Hi Alice, are you free for a quick call this afternoon?",
      },
      { id: 2, sender: "Alice Smith", text: "Sure, how about 3 PM?" },
      { id: 3, sender: "You", text: "Perfect, see you then!" },
    ],
  },
];

// --- Main App Component ---
export default function App() {
  const [screen, setScreen] = useState("list");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(initialChats);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setScreen("chat");
  };

  const handleStartChat = (name, initialMessage) => {
    const firstMessageText =
      initialMessage && initialMessage.trim() !== ""
        ? initialMessage
        : "Hey! Let's get started.";

    const newChat = {
      id: Date.now(),
      name,
      lastMessage: firstMessageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      messages: [{ id: 1, sender: "You", text: firstMessageText }],
    };

    const newChatsList = [newChat, ...chats];
    setChats(newChatsList);
    setSelectedChat(newChat);
    setScreen("chat");
  };

  const handleSendMessage = (chatId, messageText) => {
    const newMessage = { id: Date.now(), sender: "You", text: messageText };
    let updatedChat = null;

    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        updatedChat = {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: messageText,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return updatedChat;
      }
      return chat;
    });

    const finalChats = [
      updatedChat,
      ...updatedChats.filter((c) => c.id !== chatId),
    ];
    setChats(finalChats);
    setSelectedChat(updatedChat);
  };

  const renderScreen = () => {
    switch (screen) {
      case "chat":
        return (
          <ChatWindowScreen
            key="chat"
            chat={selectedChat}
            onBack={() => setScreen("list")}
            onSendMessage={handleSendMessage}
          />
        );
      case "new":
        return (
          <NewChatScreen
            key="new"
            onBack={() => setScreen("list")}
            onStartChat={handleStartChat}
          />
        );
      case "list":
      default:
        return (
          <ChatListScreen
            key="list"
            chats={chats}
            onSelectChat={handleSelectChat}
            onNewChat={() => setScreen("new")}
          />
        );
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center font-sans">
      <main className="w-full max-w-md h-full md:h-[90vh] md:max-h-[800px] bg-white shadow-xl rounded-lg overflow-hidden relative flex flex-col">
        <AnimatePresence mode="wait">{renderScreen()}</AnimatePresence>
      </main>
    </div>
  );
}

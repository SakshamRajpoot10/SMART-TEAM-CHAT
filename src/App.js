import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import './App.css';
import { dummyChats, dummyMessages } from './data/dummyData';

const WelcomeScreen = () => (
  <div className="placeholder-content">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    <h2>Select a chat to start messaging</h2>
    <p>Or create a new conversation to connect with your team.</p>
  </div>
);

function App() {
  const [chats, setChats] = useState(dummyChats);
  const [messages, setMessages] = useState(dummyMessages);
  const navigate = useNavigate();

  const handleAddNewChat = (participantName) => {
    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      name: participantName,
      lastMessage: "Chat created. Say hello!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChats(prevChats => [newChat, ...prevChats]);
    setMessages(prevMessages => ({ ...prevMessages, [newChatId]: [] }));
    navigate(`/chat/${newChatId}`);
  };

  const handleSendMessage = (chatId, text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      text: text,
      type: 'sent',
    };
    
    // Add the new message to the conversation
    setMessages(prevMessages => ({
      ...prevMessages,
      [chatId]: [...(prevMessages[chatId] || []), newMessage],
    }));

    // Update the last message in the chat list
    setChats(prevChats => prevChats.map(chat =>
      chat.id === chatId
        ? { ...chat, lastMessage: text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
        : chat
    ));
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <ChatList chats={chats} />
      </aside>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route 
            path="/chat/:chatId" 
            element={<ChatWindow 
                        allChats={chats} 
                        allMessages={messages}
                        onSendMessage={handleSendMessage} 
                     />} 
          />
          <Route 
            path="/new" 
            element={<NewChat onAddNewChat={handleAddNewChat} />} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;


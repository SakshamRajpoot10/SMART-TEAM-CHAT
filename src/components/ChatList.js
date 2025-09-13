import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const ChatList = ({ chats }) => {
  return (
    <>
      <div className="sidebar-header">
        <h1>Conversations</h1>
      </div>
      <div className="chat-list">
        {chats.map((chat) => (
          <NavLink 
            to={`/chat/${chat.id}`} 
            key={chat.id} 
            className="chat-list-item"
          >
            <div className="avatar" style={{ backgroundColor: chat.avatarColor }}>
              {chat.name.charAt(0)}
            </div>
            <div className="chat-info">
              <div className="name">{chat.name}</div>
              <div className="last-message">{chat.lastMessage}</div>
            </div>
            <div className="chat-meta">
              <span className="time">{chat.time}</span>
            </div>
          </NavLink>
        ))}
      </div>
       <Link to="/new" className="new-chat-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
          New Chat
      </Link>
    </>
  );
};

export default ChatList;


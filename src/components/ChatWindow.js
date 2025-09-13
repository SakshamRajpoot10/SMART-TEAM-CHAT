import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { summarizeThread, suggestReply } from '../services/aiService';

const ChatWindow = ({ allChats, allMessages, onSendMessage }) => {
  const { chatId } = useParams();
  const chat = allChats.find((c) => c.id === parseInt(chatId));
  const messages = allMessages[chatId] || [];

  const [aiResponse, setAiResponse] = useState('');
  const [responseType, setResponseType] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSummarize = () => {
    const summary = summarizeThread(messages);
    setResponseType('summary');
    setAiResponse(summary);
  };

  const handleSmartReply = () => {
    const reply = suggestReply(messages);
    setResponseType('reply');
    setAiResponse(reply);
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(parseInt(chatId), newMessage);
    setNewMessage('');
  };

  if (!chat) {
    return <div className="placeholder-content"><h2>Start Your Chat</h2></div>;
  }

  return (
    <div className="chat-window-container">
      <div className="chat-window-header">
        <div className="header-left">
          <Link to="/" className="back-link">
            &larr; Back
          </Link>
        </div>
        <div className="header-center">
          <h2>{chat.name}</h2>
        </div>
        <div className="header-right"></div>
      </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="placeholder-content">
            <h3>This is a new chat.</h3>
            <p>Send a message to get the conversation started.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender === 'You' ? 'sent' : 'received'}`}>
              {msg.sender !== 'You' && (
                <div className="message-avatar" style={{ backgroundColor: chat.avatarColor }}>
                  {msg.sender.charAt(0)}
                </div>
              )}
              <div className="message-content">
                {msg.sender !== 'You' && <div className="sender-name">{msg.sender}</div>}
                <div className="message">{msg.text}</div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {aiResponse && (
        <div className="ai-response-box">
          <div className="ai-response-header">
            <strong>{responseType === 'summary' ? '✨ AI Summary' : '💡 AI Suggestion'}</strong>
            <button onClick={() => setAiResponse('')} className="close-ai-btn">×</button>
          </div>
          <p>{aiResponse}</p>
        </div>
      )}
      
      {messages.length > 0 && (
         <div className="ai-buttons">
          <button className="ai-button" onClick={handleSummarize}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.2 0-2.4.6-3 1.7A3.6 3.6 0 0 0 4.6 9c-1 .6-1.7 1.8-1.7 3s.7 2.4 1.7 3c.2.8.7 1.5 1.4 2 .7.4 1.4.6 2.2.6h8c1.7 0 3-1.3 3-3s-1.3-3-3-3c0-1.7-1.3-3-3-3-1.2 0-2.2.7-2.7 1.7-.6-.5-1.3-.7-2-.7z"/></svg>
            Summarize Thread
          </button>
          <button className="ai-button" onClick={handleSmartReply}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 17 4 4 4-4"/><path d="m16 21v-8a2 2 0 0 0-2-2h-2"/><path d="m8 3 4 4 4-4"/><path d="M12 7V3"/></svg>
            Smart Reply Suggestion
          </button>
        </div>
      )}
      
      <form className="message-input-form" onSubmit={handleFormSubmit}>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;


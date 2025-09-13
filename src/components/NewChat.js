import React, { useState } from 'react';
import { generateIcebreaker } from '../services/aiService';

const NewChat = ({ onAddNewChat }) => { // Receive the handler function as a prop
  const [participant, setParticipant] = useState('');
  const [icebreaker, setIcebreaker] = useState('');

  const handleGenerateIcebreaker = (e) => {
    e.preventDefault();
    const newIcebreaker = generateIcebreaker(participant);
    setIcebreaker(newIcebreaker);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!participant.trim()) {
      alert("Please enter a participant's name.");
      return;
    }
    // Call the function passed from App.js to create the chat
    
    onAddNewChat(participant);
  };

  return (
    <form className="new-chat-container" onSubmit={handleSubmit}>
      <h2>Start a New Conversation</h2>
      <div>
        <label htmlFor="participant">Participant's Name:</label>
        <input 
          type="text" 
          id="participant" 
          placeholder="Enter name..."
          value={participant}
          onChange={(e) => setParticipant(e.target.value)}
          required
        />
      </div>
      
      <div className="new-chat-buttons-group">
        <button type="submit" className="ai-button start-chat-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Start Chat
        </button>
        <button className="ai-button" onClick={handleGenerateIcebreaker}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
          Generate Icebreaker
        </button>
      </div>

      {icebreaker && (
        <div className="ai-response-box icebreaker-box">
           <div className="ai-response-header">
            <strong>🧊 AI Icebreaker</strong>
            <button type="button" onClick={() => setIcebreaker('')} className="close-ai-btn">×</button>
          </div>
          <p>{icebreaker}</p>
        </div>
      )}
    </form>
  );
};

export default NewChat;
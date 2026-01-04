import { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import Button from '../components/ui/Button';
import '../styles/ChatWindow.css';

function ChatWindow({ messages, onSendMessage, isLoading, profile, activeWeeklyPlan, onSwitchToProfile }) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const isProfileIncomplete = !profile.name || !profile.age || !profile.gender || !profile.height || !profile.weight || !profile.goal || !profile.activityLevel || !profile.dietType;

  const handleQuickAction = (action) => {
    let message = '';
    switch (action) {
      case 'explain-today':
        message = 'Explain my plan for today';
        break;
      case 'show-workout':
        message = 'Show me today\'s workout';
        break;
      case 'save-plan':
        message = 'Save this plan';
        break;
      default:
        return;
    }
    onSendMessage(message);
  };

  return (
    <div className="chat-window">
      <div className="chat-messages-area">
        <div className="messages-container">
          {messages.map(message => (
            <MessageBubble
              key={message.id}
              sender={message.sender}
              text={message.text}
              timestamp={message.timestamp}
            />
          ))}
          {isLoading && (
            <div className="loading-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Bot is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-section">
        {isProfileIncomplete && (
          <div className="profile-cta-banner">
            <div className="profile-cta-content">
              <span>📋 Complete your profile for personalized recommendations!</span>
              <Button onClick={onSwitchToProfile} variant="primary" size="small">Go to Profile</Button>
            </div>
          </div>
        )}

        <div className="quick-actions-bar">
          <Button onClick={() => handleQuickAction('explain-today')} variant="outline" size="small">Explain Today</Button>
          <Button onClick={() => handleQuickAction('show-workout')} variant="outline" size="small">Show Today's Workout</Button>
          <Button onClick={() => handleQuickAction('save-plan')} variant="outline" size="small">Save Plan</Button>
        </div>

        <div className="input-container">
          <button onClick={() => alert('Voice input coming soon!')} className="voice-button" title="Voice input">🎤</button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="message-input"
          />
          <button onClick={handleSend} className="send-button" disabled={!inputText.trim()} title="Send message">➤</button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
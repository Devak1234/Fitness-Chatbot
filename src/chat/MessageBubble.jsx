import '../styles/ChatWindow.css';

function MessageBubble({ sender, text, timestamp }) {
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`message-bubble ${sender}`}>
      <div className="message-text">{text}</div>
      <div className="message-timestamp">{formatTime(timestamp)}</div>
    </div>
  );
}

export default MessageBubble;
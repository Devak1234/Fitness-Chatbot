import '../styles/PlanSummary.css';

function PlanSummary({ messages }) {
  const latestBotMessage = messages.slice().reverse().find(msg => msg.sender === 'bot');

  if (!latestBotMessage) return null;

  const isPlan = latestBotMessage.text.includes('Breakfast:') || latestBotMessage.text.includes('Day 1:');

  if (!isPlan) return null;

  return (
    <div className="plan-summary">
      <h3>Latest Plan</h3>
      <div className="plan-content">
        {latestBotMessage.text.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}

export default PlanSummary;
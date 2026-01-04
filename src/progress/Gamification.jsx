import { useState, useEffect } from 'react';
import '../styles/Gamification.css';

function Gamification({ entries }) {
  const [streaks, setStreaks] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (entries.length === 0) return;

    // Calculate current streak
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    let lastDate = new Date();

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const diffDays = Math.floor((lastDate - entryDate) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        currentStreak++;
        lastDate = entryDate;
      } else {
        break;
      }
    }
    setStreaks(currentStreak);

    // Calculate badges
    const newBadges = [];
    if (entries.length >= 1) newBadges.push('First Step');
    if (entries.length >= 7) newBadges.push('Week Warrior');
    if (entries.length >= 30) newBadges.push('Consistent Tracker');
    if (currentStreak >= 7) newBadges.push('Streak Master');
    if (currentStreak >= 30) newBadges.push('Unstoppable');

    setBadges(newBadges);
  }, [entries]);

  return (
    <div className="gamification">
      <h3>Gamification</h3>
      <div className="streak">
        <p>Current Streak: {streaks} days</p>
      </div>
      <div className="badges">
        <h4>Badges Earned:</h4>
        {badges.length > 0 ? (
          <ul>
            {badges.map(badge => (
              <li key={badge} className="badge">{badge} 🏆</li>
            ))}
          </ul>
        ) : (
          <p>No badges yet. Keep tracking!</p>
        )}
      </div>
    </div>
  );
}

export default Gamification;
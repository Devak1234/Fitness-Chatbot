import { useState, useEffect } from 'react';

function Gamification({ entries }) {
  const [streaks, setStreaks] = useState(0);
  const [badges, setBadges] = useState([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  useEffect(() => {
    if (entries.length === 0) return;

    // Calculate current streak
    const sortedEntries = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    let lastDate = new Date();

    // Check if entry for today exists
    const todayStr = new Date().toISOString().split('T')[0];
    const latestEntryStr = sortedEntries[0]?.date ? new Date(sortedEntries[0].date).toISOString().split('T')[0] : null;

    if (todayStr === latestEntryStr) {
      // Streak is active
    }

    for (const entry of sortedEntries) {
      const entryDate = new Date(entry.date);
      const diffDays = Math.floor((lastDate - entryDate) / (1000 * 60 * 60 * 24));
      // Allow gaps of 1 day to maintain streak logic or stricter? Stricter: diffDays <= 1
      if (diffDays <= 1) {
        currentStreak++;
        lastDate = entryDate;
      } else {
        break;
      }
    }
    setStreaks(currentStreak);
    setTotalWorkouts(entries.length);

    // Calculate badges
    const newBadges = [];
    if (entries.length >= 1) newBadges.push({ name: 'First Step', icon: '🦶', desc: 'Completed your first workout', color: 'bg-emerald-500' });
    if (entries.length >= 7) newBadges.push({ name: 'Week Warrior', icon: '⚔️', desc: '7 workouts total', color: 'bg-blue-500' });
    if (entries.length >= 30) newBadges.push({ name: 'Consistent', icon: '📅', desc: '30 workouts total', color: 'bg-purple-500' });
    if (currentStreak >= 3) newBadges.push({ name: 'On Fire', icon: '🔥', desc: '3 day streak', color: 'bg-orange-500' });
    if (currentStreak >= 7) newBadges.push({ name: 'Unstoppable', icon: '🚀', desc: '7 day streak', color: 'bg-red-600' });

    setBadges(newBadges);
  }, [entries]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-main">Achievements</h3>
          <p className="text-sub text-sm">Track your progress and earn rewards</p>
        </div>
        <div className="px-4 py-2 bg-card border border-border rounded-xl text-main font-bold shadow-sm">
          Level {Math.floor(totalWorkouts / 5) + 1}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft-xl border border-border flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">Current Streak</div>
            <div className="text-6xl font-black text-main tracking-tighter mb-1">
              {streaks}
            </div>
            <div className="text-sub font-medium">Days in a row</div>
          </div>
          {/* Visual Rings Background Effect */}
          <svg className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 text-orange-500" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" />
          </svg>
        </div>

        {/* Total Workouts Card */}
        <div className="bg-card rounded-2xl p-6 shadow-soft-xl border border-border flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-2">Total Sessions</div>
            <div className="text-6xl font-black text-main tracking-tighter mb-1">
              {totalWorkouts}
            </div>
            <div className="text-sub font-medium">Workouts completed</div>
          </div>
          <svg className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 text-blue-500" viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="8" fill="none" rx="10" />
          </svg>
        </div>

        {/* Next Milestone Card (Mock) */}
        <div className="bg-card rounded-2xl p-6 shadow-soft-xl border border-border flex flex-col justify-center relative overflow-hidden">
          <div className="text-sm font-bold text-purple-500 uppercase tracking-widest mb-4">Next Goal</div>
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-main">10 Day Streak</span>
            <span className="text-sm text-sub">{Math.min(streaks, 10)}/10</span>
          </div>
          <div className="w-full bg-input rounded-full h-3 overflow-hidden">
            <div className="bg-purple-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((streaks / 10) * 100, 100)}%` }}></div>
          </div>
          <div className="mt-4 flex items-center justify-between mb-2">
            <span className="font-bold text-main">50 Workouts</span>
            <span className="text-sm text-sub">{Math.min(totalWorkouts, 50)}/50</span>
          </div>
          <div className="w-full bg-input rounded-full h-3 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((totalWorkouts / 50) * 100, 100)}%` }}></div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold text-main mb-4 uppercase tracking-wide opacity-80 border-b border-border/50 pb-2">Trophy Cabinet</h4>
        {badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {badges.map(badge => (
              <div key={badge.name} className="flex flex-col items-center bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group relative">
                <div className={`w-16 h-16 rounded-full ${badge.color} text-white flex items-center justify-center text-3xl shadow-lg mb-3 group-hover:scale-110 transition-transform`}>
                  {badge.icon}
                </div>
                <span className="font-bold text-main text-sm text-center leading-tight">{badge.name}</span>
                <span className="text-xs text-sub text-center mt-1">{badge.desc}</span>
              </div>
            ))}
            {/* Locked Badges Placeholders */}
            {[...Array(5 - Math.min(badges.length, 5))].map((_, i) => (
              <div key={i} className="flex flex-col items-center bg-input/30 border border-border border-dashed rounded-xl p-4 grayscale opacity-50">
                <div className="w-16 h-16 rounded-full bg-input text-sub flex items-center justify-center text-2xl mb-3">
                  🔒
                </div>
                <span className="font-medium text-sub text-sm text-center">Locked</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-sub bg-input/50 rounded-2xl border border-dashed border-border">
            No badges yet. Complete your first workout to unlock!
          </div>
        )}
      </div>
    </div>
  );
}

export default Gamification;
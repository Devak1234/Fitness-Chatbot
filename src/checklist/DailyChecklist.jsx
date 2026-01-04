import { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import IconButton from '../components/ui/IconButton';
import Confetti from '../components/Confetti';
import { getChecklistForDate, setChecklistForDate, getActiveWeeklyPlan } from '../services/storage';
import '../styles/DailyChecklist.css';

function DailyChecklist() {
  const today = new Date().toISOString().split('T')[0];
  const [checklist, setChecklist] = useState(getChecklistForDate(today));
  const [showConfetti, setShowConfetti] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  const calculateCompletion = (list) => {
    const tasks = [
      list.breakfast,
      list.water >= 8,
      list.workout,
      list.sleep,
    ];
    // First 4 are required
    const completedRequired = tasks.filter(Boolean).length;
    return Math.round((completedRequired / 4) * 100);
  };

  // Calculate streak
  useEffect(() => {
    const calculateStreak = () => {
      let streak = 0;
      let currentDate = new Date();

      for (let i = 0; i < 30; i++) { // Check last 30 days
        const dateStr = currentDate.toISOString().split('T')[0];
        const dayChecklist = getChecklistForDate(dateStr);
        const dayCompletion = calculateCompletion(dayChecklist);

        if (dayCompletion === 100) {
          streak++;
        } else {
          // If it's today and not completed yet, don't break streak if yesterday was completed
          if (i === 0 && dayCompletion < 100) {
            continue;
          }
          break;
        }

        currentDate.setDate(currentDate.getDate() - 1);
      }

      setStreakCount(streak);
    };

    calculateStreak();
  }, [checklist]);

  useEffect(() => {
    setChecklist(getChecklistForDate(today));
  }, [today]);

  const handleChange = (item, value) => {
    const updated = { ...checklist, [item]: value };
    if (item === 'workout' && value === true) {
      // Mark workout as done in active plan
      const activePlan = getActiveWeeklyPlan();
      if (activePlan) {
        // Logic to mark today's workout as done - simplified
        console.log('Workout completed, updating active plan');
      }
    }
    setChecklist(updated);
    setChecklistForDate(today, updated);

    // Check for 100% completion
    const newCompletion = calculateCompletion(updated);
    if (newCompletion === 100 && calculateCompletion(checklist) < 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const markAllComplete = () => {
    const completed = {
      ...checklist,
      breakfast: true,
      water: 8,
      workout: true,
      sleep: true,
      supplements: true,
      steps: 10000
    };
    setChecklist(completed);
    setChecklistForDate(today, completed);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const completion = calculateCompletion(checklist);

  return (
    <div className="flex flex-col gap-8 w-full">
      <Confetti show={showConfetti} />

      <div className="flex flex-col text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📋 Daily Routine Tracker</h2>
        <p className="text-gray-500 text-lg">
          {new Date(today).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col justify-center h-full">
          <div className="flex items-center gap-6 p-2">
            <div className="relative w-32 h-32 flex-shrink-0">
              {/* Conic Gradient Progress Ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(#0ea5e9 ${completion * 3.6}deg, #f3f4f6 0deg)`
                }}
              />
              <div className="absolute inset-2 bg-white rounded-full flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-gray-900">{completion}%</div>
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mt-1">Complete</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <div>
                <Badge variant={streakCount > 0 ? "success" : "secondary"} size="large" className="text-sm">
                  🔥 {streakCount} day streak
                </Badge>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">Tasks Done</span>
                <span className="text-2xl font-bold text-gray-900">
                  {[
                    checklist.breakfast,
                    checklist.water >= 8,
                    checklist.workout,
                    checklist.sleep
                  ].filter(Boolean).length}/4
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-center h-full relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-6 text-center p-2">
            <div className="w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Actions</h3>
              <Button
                onClick={markAllComplete}
                variant="primary"
                className="w-full max-w-xs shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                size="large"
              >
                ✨ Mark All Complete
              </Button>
            </div>
            {completion === 100 && (
              <div className="text-green-600 font-bold text-lg animate-bounce">
                🎉 Perfect day! Keep it up!
              </div>
            )}
            {completion > 0 && completion < 100 && (
              <div className="text-gray-500">
                You're <span className="font-bold text-gray-900">{100 - completion}%</span> away from completing your daily routine. You've got this! 💪
              </div>
            )}
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </Card>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Breakfast Task */}
        <div className={`transition-all duration-300 transform hover:-translate-y-1 ${checklist.breakfast ? 'opacity-80' : ''}`}>
          <Card className={`h-full border-l-4 ${checklist.breakfast ? 'border-l-green-500 bg-green-50/30' : 'border-l-gray-200'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-orange-100 text-2xl rounded-xl flex-shrink-0">🥐</div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${checklist.breakfast ? 'text-gray-500 line-through' : 'text-gray-900'}`}>Breakfast</h3>
                <p className="text-sm text-gray-500">Start your day with nutritious fuel</p>
              </div>
              <IconButton
                onClick={() => handleChange('breakfast', !checklist.breakfast)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${checklist.breakfast ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-transparent hover:border-green-500'}`}
                aria-label={checklist.breakfast ? "Mark breakfast as incomplete" : "Mark breakfast as complete"}
              >
                ✓
              </IconButton>
            </div>
          </Card>
        </div>

        {/* Workout Task */}
        <div className={`transition-all duration-300 transform hover:-translate-y-1 ${checklist.workout ? 'opacity-80' : ''}`}>
          <Card className={`h-full border-l-4 ${checklist.workout ? 'border-l-green-500 bg-green-50/30' : 'border-l-gray-200'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-2xl rounded-xl flex-shrink-0">🏋️</div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${checklist.workout ? 'text-gray-500 line-through' : 'text-gray-900'}`}>Workout</h3>
                <p className="text-sm text-gray-500">Complete your daily exercise routine</p>
              </div>
              <IconButton
                onClick={() => handleChange('workout', !checklist.workout)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${checklist.workout ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-transparent hover:border-green-500'}`}
                aria-label={checklist.workout ? "Mark workout as incomplete" : "Mark workout as complete"}
              >
                ✓
              </IconButton>
            </div>
          </Card>
        </div>

        {/* Sleep Task */}
        <div className={`transition-all duration-300 transform hover:-translate-y-1 ${checklist.sleep ? 'opacity-80' : ''}`}>
          <Card className={`h-full border-l-4 ${checklist.sleep ? 'border-l-green-500 bg-green-50/30' : 'border-l-gray-200'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-purple-100 text-2xl rounded-xl flex-shrink-0">😴</div>
              <div className="flex-1">
                <h3 className={`text-lg font-bold ${checklist.sleep ? 'text-gray-500 line-through' : 'text-gray-900'}`}>Sleep</h3>
                <p className="text-sm text-gray-500">Get 7+ hours of quality rest</p>
              </div>
              <IconButton
                onClick={() => handleChange('sleep', !checklist.sleep)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${checklist.sleep ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-transparent hover:border-green-500'}`}
                aria-label={checklist.sleep ? "Mark sleep as incomplete" : "Mark sleep as complete"}
              >
                ✓
              </IconButton>
            </div>
          </Card>
        </div>

        {/* Water Intake Task */}
        <div className={`transition-all duration-300 transform hover:-translate-y-1 ${checklist.water >= 8 ? 'opacity-80' : ''}`}>
          <Card className={`h-full border-l-4 ${checklist.water >= 8 ? 'border-l-green-500 bg-green-50/30' : 'border-l-gray-200'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-cyan-100 text-2xl rounded-xl flex-shrink-0">💧</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-lg font-bold ${checklist.water >= 8 ? 'text-gray-500' : 'text-gray-900'}`}>Water Intake</h3>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">{checklist.water}</span>
                    <span className="text-xs text-gray-500 font-medium uppercase ml-1">glasses</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    value={checklist.water}
                    onChange={(e) => handleChange('water', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    aria-label={`Water intake: ${checklist.water} glasses`}
                  />
                  {checklist.water >= 8 && <Badge variant="success" size="small">✓ Goal</Badge>}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Supplements Task (Optional) */}
        <div className={`transition-all duration-300 transform hover:-translate-y-1 ${checklist.supplements ? 'opacity-80' : ''}`}>
          <Card className={`h-full border-l-4 border-dashed ${checklist.supplements ? 'border-l-green-500 bg-green-50/30 border-solid' : 'border-l-gray-300'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-pink-100 text-2xl rounded-xl flex-shrink-0">💊</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-lg font-bold ${checklist.supplements ? 'text-gray-500 line-through' : 'text-gray-900'}`}>Supplements</h3>
                  <Badge variant="secondary" size="small" className="text-[10px] px-1.5 py-0.5 h-auto">Optional</Badge>
                </div>
                <p className="text-sm text-gray-500">Take your daily supplements</p>
              </div>
              <IconButton
                onClick={() => handleChange('supplements', !checklist.supplements)}
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${checklist.supplements ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 text-transparent hover:border-green-500'}`}
                aria-label={checklist.supplements ? "Mark supplements as not taken" : "Mark supplements as taken"}
              >
                ✓
              </IconButton>
            </div>
          </Card>
        </div>

        {/* Steps Task (Optional) */}
        <div className={`transition-all duration-300 transform hover:-translate-y-1 ${(checklist.steps || 0) >= 10000 ? 'opacity-80' : ''}`}>
          <Card className={`h-full border-l-4 border-dashed ${(checklist.steps || 0) >= 10000 ? 'border-l-green-500 bg-green-50/30 border-solid' : 'border-l-gray-300'}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 flex items-center justify-center bg-yellow-100 text-2xl rounded-xl flex-shrink-0">🚶</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-lg font-bold ${(checklist.steps || 0) >= 10000 ? 'text-gray-500' : 'text-gray-900'}`}>Daily Steps</h3>
                  <Badge variant="secondary" size="small" className="text-[10px] px-1.5 py-0.5 h-auto">Optional</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={checklist.steps || 0}
                      onChange={(e) => handleChange('steps', parseInt(e.target.value) || 0)}
                      className="w-24 px-3 py-1.5 text-center font-bold bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="0"
                    />
                    <span className="absolute right-[-45px] top-1/2 transform -translate-y-1/2 text-sm text-gray-500 font-medium">steps</span>
                  </div>
                  <div className="flex-1"></div>
                  {(checklist.steps || 0) >= 10000 && <Badge variant="success" size="small">✓ Goal</Badge>}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DailyChecklist;
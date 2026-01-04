import { useState, useEffect } from 'react';
import ProfileForm from './profile/ProfileForm';
import ChatWindow from './chat/ChatWindow';
import PlansPage from './components/PlansPage';
import NutritionPage from './components/NutritionPage';
import WorkoutLibraryPage from './components/workout/WorkoutLibraryPage';
import WeeklyPlanPage from './plans/WeeklyPlanPage';
import ProgressTracker from './progress/ProgressTracker';
import Gamification from './progress/Gamification';
import DailyChecklist from './checklist/DailyChecklist';
import FoodDetail from './components/food/FoodDetail';
import ExerciseDetail from './components/workout/ExerciseDetail';
import NotificationSettings from './components/NotificationSettings';
import FavoritesPanel from './components/FavoritesPanel';
import IconButton from './components/ui/IconButton';
import { getFitnessResponse } from './utils/aiClient';
import notificationService from './services/notifications';
import {
  getProfile,
  getProgressEntries,
  setProgressEntries,
  getSavedPlans,
  setSavedPlans,
  getActiveWeeklyPlan,
  getChecklistForDate,
} from './services/storage';
import './styles/App.css';

// SVG Icons for Navigation
const Icons = {
  Chat: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  Plan: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  Nutrition: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Workout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Progress: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" /></svg>,
  Checklist: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Moon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
  Sun: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
}

function App() {
  const [profile, setProfile] = useState({
    name: '', age: '', gender: '', height: '', weight: '', goal: '',
    activityLevel: '', dietType: '', allergies: '', workSchedule: ''
  });
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progressEntries, setProgressEntries] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [savedPlans, setSavedPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);
  const [activeWeeklyPlan, setActiveWeeklyPlan] = useState(null);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);

  useEffect(() => {
    setProfile(getProfile());
    setProgressEntries(getProgressEntries());
    setSavedPlans(getSavedPlans());
    setActiveWeeklyPlan(getActiveWeeklyPlan());
  }, []);

  useEffect(() => { setProfile(profile); }, [profile]);
  useEffect(() => { setProgressEntries(progressEntries); }, [progressEntries]);
  useEffect(() => { setSavedPlans(savedPlans); }, [savedPlans]);
  useEffect(() => { setActiveWeeklyPlan(activeWeeklyPlan); }, [activeWeeklyPlan]);

  // Initialize notifications on app load
  useEffect(() => {
    const settings = notificationService.getSettings();
    notificationService.applySettings(settings);
  }, []);

  // Theme State
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleProfileChange = (newProfile) => setProfile(newProfile);

  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), sender: 'user', text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const nutritionContext = { selectedFoods: [], selectedDietPlan: null, currentDietPlan: null };
      const workoutContext = { selectedWorkoutPlan: null, selectedExercises: [], selectedDay: null, currentWorkoutPlan: null };
      const botResponse = await getFitnessResponse([...messages, userMessage], profile, nutritionContext, workoutContext);
      const botMessage = { id: Date.now() + 1, sender: 'bot', text: botResponse, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Sorry, something went wrong. Please try again.', timestamp: new Date().toISOString() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const navItems = [
    { id: 'chat', label: 'AI Chat', icon: Icons.Chat },
    { id: 'weekly-plan', label: 'My Plan', icon: Icons.Plan },
    { id: 'nutrition', label: 'Nutrition', icon: Icons.Nutrition },
    { id: 'workout', label: 'Workout', icon: Icons.Workout },
    { id: 'checklist', label: 'Checklist', icon: Icons.Checklist },
    { id: 'progress', label: 'Progress', icon: Icons.Progress },
  ];

  const renderTabContent = () => {
    const commonClasses = "max-w-5xl mx-auto space-y-8 animate-fade-in";

    switch (activeTab) {
      case 'chat':
        return (
          <div className={commonClasses}>
            {/* Dashboard Overview Section */}
            {activeWeeklyPlan && (
              <section className="bg-card/70 backdrop-blur-md rounded-2xl shadow-lg border border-border/50 p-6 md:p-8 transition-all hover:shadow-xl">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-main tracking-tight">Welcome Back, {profile.name || 'Athlete'}</h2>
                      <p className="text-sub mt-1">Here is your daily overview.</p>
                    </div>
                    <span className="text-sm px-3 py-1 bg-primary/10 text-primary font-medium rounded-full border border-primary/20">
                      {activeWeeklyPlan.settings.goal}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Daily Focus Card */}
                    <div className="bg-input/50 rounded-xl p-5 border border-border/50 hover:bg-input transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Icons.Workout /></span>
                        <span className="text-sm font-bold text-sub uppercase tracking-wider">Today's Focus</span>
                      </div>
                      <div className="text-lg font-bold text-main">
                        {(() => {
                          const today = new Date().getDay();
                          const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                          const dayKey = dayNames[today];
                          const dayData = activeWeeklyPlan.workout.find(d => d.day.toLowerCase() === dayKey);
                          return dayData ? dayData.focus : 'Rest & Recovery';
                        })()}
                      </div>
                    </div>

                    {/* Checklist Status Card */}
                    <div className="bg-input/50 rounded-xl p-5 border border-border/50 hover:bg-input transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg"><Icons.Checklist /></span>
                        <span className="text-sm font-bold text-sub uppercase tracking-wider">Daily Goals</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <div className="text-2xl font-bold text-main">
                          {(() => {
                            const today = new Date().toISOString().split('T')[0];
                            const checklist = getChecklistForDate(today);
                            const tasks = [checklist.breakfast, checklist.water >= 8, checklist.workout, checklist.sleep];
                            return tasks.filter(Boolean).length;
                          })()}
                        </div>
                        <span className="text-sub font-medium">/ 4 completed</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full transition-all duration-500" style={{ width: `${(([getChecklistForDate(new Date().toISOString().split('T')[0]).breakfast, getChecklistForDate(new Date().toISOString().split('T')[0]).water >= 8, getChecklistForDate(new Date().toISOString().split('T')[0]).workout, getChecklistForDate(new Date().toISOString().split('T')[0]).sleep].filter(Boolean).length / 4) * 100)}%` }}></div>
                      </div>
                    </div>

                    {/* Plan Status Card */}
                    <div className="bg-input/50 rounded-xl p-5 border border-border/50 hover:bg-input transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Icons.Plan /></span>
                        <span className="text-sm font-bold text-sub uppercase tracking-wider">Active Plan</span>
                      </div>
                      <div className="text-lg font-bold text-main truncate">
                        Weekly Workout split
                      </div>
                      <div className="text-xs text-sub mt-1">
                        Day {new Date().getDay() + 1} of 7
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <div className="bg-card/90 backdrop-blur-sm rounded-2xl shadow-soft-xl border border-border overflow-hidden min-h-[600px] flex flex-col relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />
              <ChatWindow
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                profile={profile}
                activeWeeklyPlan={activeWeeklyPlan}
                onSwitchToProfile={() => setActiveTab('profile')}
              />
            </div>
          </div>
        );
      case 'plans': return <div className={commonClasses}><PlansPage onSelectPlan={setSelectedPlan} onSelectWorkoutPlan={setSelectedWorkoutPlan} /></div>;
      case 'progress': return <div className={commonClasses}><ProgressTracker profile={profile} entries={progressEntries} onAddEntry={setProgressEntries} /><Gamification entries={progressEntries} /></div>;
      case 'profile': return <div className={commonClasses}><ProfileForm profile={profile} onProfileChange={handleProfileChange} /></div>;
      case 'checklist': return <div className={commonClasses}><DailyChecklist /></div>;
      case 'nutrition': return <div className={commonClasses}><NutritionPage onSelectFood={setSelectedFood} onGeneratePlan={() => handleSendMessage(`Generate a diet plan using these foods: ${selectedFoods.map(f => f.name).join(', ')}`)} /></div>;
      case 'workout': return <div className={commonClasses}><WorkoutLibraryPage onSelectExercise={setSelectedExercise} /></div>;
      case 'favorites': return <div className={commonClasses}><FavoritesPanel onSelectFood={setSelectedFood} onSelectExercise={setSelectedExercise} /></div>;
      case 'weekly-plan': return <div className={commonClasses}><WeeklyPlanPage profile={profile} onSetActivePlan={setActiveWeeklyPlan} /></div>;
      default: return null;
    }
  };

  return (
    <div className="app bg-page min-h-screen font-sans text-main selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      {/* Premium Glassmorphism Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-white/10 dark:border-white/5 shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setActiveTab('chat')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
              <Icons.Workout />
            </div>
            <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Fitness AI
            </h1>
          </div>

          <nav className="hidden md:flex items-center bg-input/50 p-1 rounded-xl border border-border/50 backdrop-blur-md">
            {navItems.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                  ? 'bg-card text-main shadow-sm ring-1 ring-border'
                  : 'text-sub hover:text-main hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                <span><tab.icon /></span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <IconButton onClick={toggleTheme} variant="ghost" size="medium" title="Toggle Theme" className="hover:bg-input rounded-xl text-sub hover:text-main">
              {theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}
            </IconButton>
            <IconButton onClick={() => setShowNotificationSettings(true)} variant="ghost" size="medium" title="Notifications" className="hover:bg-input rounded-xl text-sub hover:text-main">
              <Icons.Bell />
            </IconButton>
            <button onClick={() => setActiveTab('profile')} className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center hover:ring-2 hover:ring-offset-2 hover:ring-primary/50 transition-all text-sub hover:text-main ml-2 overflow-hidden shadow-sm" title="Profile">
              <Icons.User />
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Scrollable */}
        <div className="md:hidden border-t border-border/30 overflow-x-auto scrollbar-hide bg-card/50 backdrop-blur-xl">
          <div className="flex px-4 py-2 gap-2 min-w-max">
            {navItems.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-input/50 text-sub border border-border/30'
                  }`}
              >
                <tab.icon />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="px-4 md:px-6 py-8 md:py-10 max-w-7xl mx-auto">
        {renderTabContent()}
      </main>

      <footer className="mt-auto border-t border-border bg-card py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-sub">
          <div className="space-y-3">
            <h4 className="font-bold text-main text-base">Fitness AI</h4>
            <p className="leading-relaxed">Your personal AI-powered fitness and nutrition coach. Helping you achieve your goals one day at a time.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-main text-base">Safety First</h4>
            <p className="leading-relaxed">Consult a physician before beginning any exercise program. Listen to your body and train smart.</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-main text-base">Disclaimer</h4>
            <p className="leading-relaxed">Generated plans are for educational purposes. Nutritional values are estimates.</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-6 mt-12 pt-8 border-t border-border/50 text-center text-xs text-sub opacity-60">
          © 2025 Fitness AI • Designed with precision
        </div>
      </footer>

      {selectedFood && (
        <FoodDetail
          food={selectedFood}
          onAddToMeal={(food) => setSelectedFoods(prev => [...prev, food])}
          onAskAI={(food) => handleSendMessage(`Tell me about ${food.name} and how it fits my diet`)}
          onClose={() => setSelectedFood(null)}
        />
      )}
      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onAddToPlan={(exercise, day) => {
            setSelectedWorkoutPlan(prev => {
              if (!prev) return null;
              const updated = { ...prev };
              if (!updated.days[day]) updated.days[day] = { name: `${day.charAt(0).toUpperCase() + day.slice(1)} Custom`, exercises: [] };
              updated.days[day].exercises.push(exercise);
              return updated;
            });
          }}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      <NotificationSettings
        isOpen={showNotificationSettings}
        onClose={() => setShowNotificationSettings(false)}
      />
    </div>
  );
}

export default App;

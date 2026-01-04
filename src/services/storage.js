// Storage helper functions for localStorage management

const STORAGE_KEYS = {
  PROFILE: 'fitnessProfile',
  PROGRESS_ENTRIES: 'progressEntries',
  SAVED_PLANS: 'savedPlans',
  ACTIVE_WEEKLY_PLAN: 'activeWeeklyPlan',
  FAVORITES: 'favorites',
  NOTIFICATION_SETTINGS: 'notificationSettings',
  CHECKLIST_PREFIX: 'checklist_',
};

// Generic storage functions
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

// Specific functions for app data
export const getProfile = () => getFromStorage(STORAGE_KEYS.PROFILE, {});
export const setProfile = (profile) => setToStorage(STORAGE_KEYS.PROFILE, profile);

export const getProgressEntries = () => getFromStorage(STORAGE_KEYS.PROGRESS_ENTRIES, []);
export const setProgressEntries = (entries) => setToStorage(STORAGE_KEYS.PROGRESS_ENTRIES, entries);

export const getSavedPlans = () => getFromStorage(STORAGE_KEYS.SAVED_PLANS, []);
export const setSavedPlans = (plans) => setToStorage(STORAGE_KEYS.SAVED_PLANS, plans);

export const getActiveWeeklyPlan = () => getFromStorage(STORAGE_KEYS.ACTIVE_WEEKLY_PLAN, null);
export const setActiveWeeklyPlan = (plan) => setToStorage(STORAGE_KEYS.ACTIVE_WEEKLY_PLAN, plan);


// Checklist functions (date-based)
export const getChecklistForDate = (date) => {
  const key = `${STORAGE_KEYS.CHECKLIST_PREFIX}${date}`;
  return getFromStorage(key, {
    breakfast: false,
    water: 0, // glasses
    workout: false,
    sleep: false,
    supplements: false,
    steps: 0,
  });
};

export const setChecklistForDate = (date, checklist) => {
  const key = `${STORAGE_KEYS.CHECKLIST_PREFIX}${date}`;
  setToStorage(key, checklist);
};

export const getAllChecklistDates = () => {
  const keys = Object.keys(localStorage).filter(key => key.startsWith(STORAGE_KEYS.CHECKLIST_PREFIX));
  return keys.map(key => key.replace(STORAGE_KEYS.CHECKLIST_PREFIX, '')).sort();
};

// Favorites functions
export const getFavorites = () => getFromStorage(STORAGE_KEYS.FAVORITES, { foods: [], exercises: [] });
export const setFavorites = (favorites) => setToStorage(STORAGE_KEYS.FAVORITES, favorites);
export const addFavoriteFood = (foodId) => {
  const favs = getFavorites();
  if (!favs.foods.includes(foodId)) {
    favs.foods.push(foodId);
    setFavorites(favs);
  }
};
export const removeFavoriteFood = (foodId) => {
  const favs = getFavorites();
  favs.foods = favs.foods.filter(id => id !== foodId);
  setFavorites(favs);
};
export const addFavoriteExercise = (exerciseId) => {
  const favs = getFavorites();
  if (!favs.exercises.includes(exerciseId)) {
    favs.exercises.push(exerciseId);
    setFavorites(favs);
  }
};
export const removeFavoriteExercise = (exerciseId) => {
  const favs = getFavorites();
  favs.exercises = favs.exercises.filter(id => id !== exerciseId);
  setFavorites(favs);
};

// Notification settings functions
export const getNotificationSettings = () => getFromStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS, {
  workoutReminders: false,
  workoutTime: '18:00',
  waterReminders: false,
  waterInterval: 120,
  checklistReminders: false,
  checklistTime: '20:00'
});
export const setNotificationSettings = (settings) => setToStorage(STORAGE_KEYS.NOTIFICATION_SETTINGS, settings);

// Utility functions
export const clearAllData = () => {
  try {
    // Clear all app-related localStorage keys
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key === STORAGE_KEYS.CHECKLIST_PREFIX) {
        // Clear all checklist entries
        const keys = Object.keys(localStorage).filter(k => k.startsWith(key));
        keys.forEach(k => localStorage.removeItem(k));
      } else {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const exportData = () => {
  try {
    const data = {
      profile: getProfile(),
      progressEntries: getProgressEntries(),
      savedPlans: getSavedPlans(),
      activeWeeklyPlan: getActiveWeeklyPlan(),
      favorites: getFavorites(),
      notificationSettings: getNotificationSettings(),
      exportedAt: new Date().toISOString()
    };
    return data;
  } catch (error) {
    console.error('Error exporting data:', error);
    return null;
  }
};

export const importData = (data) => {
  try {
    if (data.profile) setProfile(data.profile);
    if (data.progressEntries) setProgressEntries(data.progressEntries);
    if (data.savedPlans) setSavedPlans(data.savedPlans);
    if (data.activeWeeklyPlan) setActiveWeeklyPlan(data.activeWeeklyPlan);
    if (data.favorites) setFavorites(data.favorites);
    if (data.notificationSettings) setNotificationSettings(data.notificationSettings);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
// Browser Notifications Service
class NotificationService {
  constructor() {
    this.permission = null;
    this.scheduledNotifications = new Map();
  }

  // Request notification permission
  async requestPermission() {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      this.permission = 'granted';
      return true;
    }

    if (Notification.permission === 'denied') {
      this.permission = 'denied';
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  // Check if notifications are supported and permitted
  isSupported() {
    return 'Notification' in window;
  }

  hasPermission() {
    return Notification.permission === 'granted';
  }

  // Show a notification
  showNotification(title, options = {}) {
    if (!this.hasPermission()) {
      console.warn('Notification permission not granted');
      return null;
    }

    const defaultOptions = {
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: 'fitness-app',
      requireInteraction: false,
      silent: false,
      ...options
    };

    try {
      const notification = new Notification(title, defaultOptions);

      // Auto-close after 5 seconds unless it requires interaction
      if (!defaultOptions.requireInteraction) {
        setTimeout(() => {
          notification.close();
        }, 5000);
      }

      return notification;
    } catch (error) {
      console.error('Error showing notification:', error);
      return null;
    }
  }

  // Schedule a workout reminder
  scheduleWorkoutReminder(timeString, message = "Time for your workout! 💪") {
    if (!this.hasPermission()) return false;

    const [hours, minutes] = timeString.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      this.showNotification('🏋️ Workout Reminder', {
        body: message,
        tag: 'workout-reminder',
        icon: '/vite.svg',
        requireInteraction: true
      });

      // Reschedule for the next day
      this.scheduleWorkoutReminder(timeString, message);
    }, timeUntilReminder);

    this.scheduledNotifications.set('workout-reminder', timeoutId);
    return true;
  }

  // Schedule water intake reminders
  scheduleWaterReminders(intervalMinutes = 120) {
    if (!this.hasPermission()) return false;

    // Clear existing water reminders
    this.cancelScheduledNotification('water-reminder');

    const scheduleNextReminder = () => {
      const timeoutId = setTimeout(() => {
        this.showNotification('💧 Water Reminder', {
          body: 'Time to drink some water! Stay hydrated! 💧',
          tag: 'water-reminder',
          icon: '/vite.svg'
        });

        // Schedule the next reminder
        scheduleNextReminder();
      }, intervalMinutes * 60 * 1000);

      this.scheduledNotifications.set('water-reminder', timeoutId);
    };

    // Start the cycle
    scheduleNextReminder();
    return true;
  }

  // Schedule daily checklist reminder
  scheduleChecklistReminder(hour = 20, minute = 0) {
    if (!this.hasPermission()) return false;

    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hour, minute, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      this.showNotification('📋 Daily Checklist', {
        body: "Don't forget to complete your daily fitness routine! ✅",
        tag: 'checklist-reminder',
        icon: '/vite.svg',
        requireInteraction: true
      });

      // Reschedule for the next day
      this.scheduleChecklistReminder(hour, minute);
    }, timeUntilReminder);

    this.scheduledNotifications.set('checklist-reminder', timeoutId);
    return true;
  }

  // Cancel a scheduled notification
  cancelScheduledNotification(type) {
    const timeoutId = this.scheduledNotifications.get(type);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.scheduledNotifications.delete(type);
    }
  }

  // Cancel all scheduled notifications
  cancelAllScheduledNotifications() {
    this.scheduledNotifications.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.scheduledNotifications.clear();
  }

  // Get notification settings from storage
  getSettings() {
    // For now, use localStorage directly to avoid circular dependency
    try {
      const settings = localStorage.getItem('notificationSettings');
      return settings ? JSON.parse(settings) : {
        workoutReminders: false,
        workoutTime: '18:00',
        waterReminders: false,
        waterInterval: 120,
        checklistReminders: false,
        checklistTime: '20:00'
      };
    } catch (error) {
      console.error('Error loading notification settings:', error);
      return {
        workoutReminders: false,
        workoutTime: '18:00',
        waterReminders: false,
        waterInterval: 120,
        checklistReminders: false,
        checklistTime: '20:00'
      };
    }
  }

  // Save notification settings using storage
  saveSettings(settings) {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  }

  // Apply settings and schedule notifications
  applySettings(settings) {
    this.cancelAllScheduledNotifications();

    if (settings.workoutReminders && settings.workoutTime) {
      this.scheduleWorkoutReminder(settings.workoutTime);
    }

    if (settings.waterReminders) {
      this.scheduleWaterReminders(settings.waterInterval);
    }

    if (settings.checklistReminders && settings.checklistTime) {
      const [hour, minute] = settings.checklistTime.split(':').map(Number);
      this.scheduleChecklistReminder(hour, minute);
    }
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;
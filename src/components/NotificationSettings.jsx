import { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Modal from './ui/Modal';
import Badge from './ui/Badge';
import notificationService from '../services/notifications';
import { getNotificationSettings } from '../services/storage';
import './NotificationSettings.css';

const NotificationSettings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState(getNotificationSettings());
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(notificationService.isSupported());
    setPermissionStatus(Notification.permission);
  }, []);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  const handleSave = () => {
    notificationService.saveSettings(settings);
    notificationService.applySettings(settings);
    onClose();
  };

  const handleRequestPermission = async () => {
    const granted = await notificationService.requestPermission();
    setPermissionStatus(granted ? 'granted' : 'denied');
  };

  const getPermissionBadge = () => {
    switch (permissionStatus) {
      case 'granted':
        return <Badge variant="success">Enabled</Badge>;
      case 'denied':
        return <Badge variant="danger">Blocked</Badge>;
      default:
        return <Badge variant="secondary">Not Set</Badge>;
    }
  };

  if (!isSupported) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Notifications" size="medium">
        <div className="notification-unsupported">
          <div className="unsupported-icon">🔔</div>
          <h3>Notifications Not Supported</h3>
          <p>Your browser doesn't support notifications. Try updating to a modern browser.</p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🔔 Notification Settings" size="medium">
      <div className="notification-settings">
        {/* Permission Status */}
        <Card className="permission-card">
          <div className="permission-header">
            <h3>Browser Permission</h3>
            {getPermissionBadge()}
          </div>
          <p className="permission-description">
            Allow notifications to receive reminders for workouts, water intake, and daily checklists.
          </p>
          {permissionStatus !== 'granted' && (
            <Button onClick={handleRequestPermission} variant="primary">
              Enable Notifications
            </Button>
          )}
        </Card>

        {/* Notification Types */}
        <div className="notification-types">
          {/* Workout Reminders */}
          <Card className="notification-type-card">
            <div className="notification-type-header">
              <div className="type-info">
                <div className="type-icon">🏋️</div>
                <div>
                  <h4>Workout Reminders</h4>
                  <p>Get notified when it's time for your workout</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.workoutReminders}
                  onChange={(e) => handleSettingChange('workoutReminders', e.target.checked)}
                  disabled={permissionStatus !== 'granted'}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {settings.workoutReminders && (
              <div className="notification-config">
                <label className="config-label">Reminder Time:</label>
                <input
                  type="time"
                  value={settings.workoutTime}
                  onChange={(e) => handleSettingChange('workoutTime', e.target.value)}
                  className="time-input"
                />
              </div>
            )}
          </Card>

          {/* Water Reminders */}
          <Card className="notification-type-card">
            <div className="notification-type-header">
              <div className="type-info">
                <div className="type-icon">💧</div>
                <div>
                  <h4>Water Intake Reminders</h4>
                  <p>Regular reminders to stay hydrated</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.waterReminders}
                  onChange={(e) => handleSettingChange('waterReminders', e.target.checked)}
                  disabled={permissionStatus !== 'granted'}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {settings.waterReminders && (
              <div className="notification-config">
                <label className="config-label">Interval (minutes):</label>
                <select
                  value={settings.waterInterval}
                  onChange={(e) => handleSettingChange('waterInterval', parseInt(e.target.value))}
                  className="interval-select"
                >
                  <option value="60">Every hour</option>
                  <option value="90">Every 1.5 hours</option>
                  <option value="120">Every 2 hours</option>
                  <option value="180">Every 3 hours</option>
                </select>
              </div>
            )}
          </Card>

          {/* Daily Checklist Reminders */}
          <Card className="notification-type-card">
            <div className="notification-type-header">
              <div className="type-info">
                <div className="type-icon">📋</div>
                <div>
                  <h4>Daily Checklist Reminders</h4>
                  <p>Evening reminder to complete your daily routine</p>
                </div>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.checklistReminders}
                  onChange={(e) => handleSettingChange('checklistReminders', e.target.checked)}
                  disabled={permissionStatus !== 'granted'}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {settings.checklistReminders && (
              <div className="notification-config">
                <label className="config-label">Reminder Time:</label>
                <input
                  type="time"
                  value={settings.checklistTime}
                  onChange={(e) => handleSettingChange('checklistTime', e.target.value)}
                  className="time-input"
                />
              </div>
            )}
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="notification-actions">
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary">
            Save Settings
          </Button>
        </div>

        {/* Info Note */}
        <div className="notification-info">
          <p>
            💡 <strong>Tip:</strong> Notifications help you stay consistent with your fitness routine.
            You can change these settings anytime.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationSettings;
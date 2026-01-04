import { useState } from 'react';
import Button from './ui/Button';
import Modal from './ui/Modal';
import { getFitnessResponse } from '../utils/aiClient';
import './ActivePlanBanner.css';

const ActivePlanBanner = ({ activeWeeklyPlan, onSwitchToWeekly, profile }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewResponse, setReviewResponse] = useState(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);

  if (!activeWeeklyPlan) return null;

  // Get today's workout and diet info
  const getTodayInfo = () => {
    const today = new Date().getDay(); // 0 = Sunday
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayKey = dayNames[today];

    const workoutDay = activeWeeklyPlan.workout.find(d => d.day.toLowerCase() === dayKey);
    const dietDay = activeWeeklyPlan.diet.find(d => d.day.toLowerCase() === dayKey);

    return { workoutDay, dietDay };
  };

  const { workoutDay, dietDay } = getTodayInfo();

  const handleReviewPlan = async () => {
    setIsReviewLoading(true);
    try {
      const reviewMessage = `Please review this weekly fitness and diet plan for a ${profile.age} year old ${profile.gender} with goal ${activeWeeklyPlan.settings.goal}, experience ${activeWeeklyPlan.settings.experienceLevel}, ${activeWeeklyPlan.settings.daysPerWeek} workout days, diet type ${activeWeeklyPlan.settings.dietType}.

Workout Plan: ${JSON.stringify(activeWeeklyPlan.workout)}

Diet Plan: ${JSON.stringify(activeWeeklyPlan.diet)}

Provide suggestions for improvements, balance, and any concerns.`;

      const response = await getFitnessResponse([{
        id: Date.now(),
        sender: 'user',
        text: reviewMessage,
        timestamp: new Date().toISOString()
      }], profile, {}, {});

      setReviewResponse(response);
      setIsReviewModalOpen(true);
    } catch (error) {
      setReviewResponse('Sorry, unable to get review at this time.');
      setIsReviewModalOpen(true);
    } finally {
      setIsReviewLoading(false);
    }
  };

  return (
    <>
      <div className="active-plan-banner">
        <div className="banner-content">
          <div className="plan-info">
            <div className="plan-title">
              🎯 <strong>{activeWeeklyPlan.settings.goal}</strong> • {activeWeeklyPlan.settings.daysPerWeek} • {activeWeeklyPlan.settings.dietType}
            </div>
            <div className="today-summary">
              <div className="today-workout">
                🏋️ <strong>Today:</strong> {workoutDay ? workoutDay.focus : 'Rest day'}
              </div>
              <div className="today-diet">
                🥗 <strong>Diet:</strong> {dietDay ? `${dietDay.meals.breakfast.length} meals planned` : 'No meals planned'}
              </div>
            </div>
          </div>
          <div className="banner-actions">
            <Button size="small" variant="outline" onClick={onSwitchToWeekly}>
              📅 View Plan
            </Button>
            <Button
              size="small"
              variant="outline"
              onClick={handleReviewPlan}
              disabled={isReviewLoading}
            >
              {isReviewLoading ? '🤔 Reviewing...' : '🧠 AI Review'}
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="🤖 AI Plan Review"
        size="large"
      >
        <div className="review-content">
          {reviewResponse ? (
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {reviewResponse}
            </div>
          ) : (
            <div className="loading-review">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Analyzing your plan...
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ActivePlanBanner;
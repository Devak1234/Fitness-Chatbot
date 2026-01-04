import '../styles/WorkoutPlanCard.css';

function WorkoutPlanCard({ plan, onSave }) {
  const handleSave = () => {
    onSave(plan);
  };

  return (
    <div className="workout-plan-card">
      <h3>Weekly Workout Plan</h3>
      <div className="workouts">
        {Object.entries(plan).map(([day, exercises]) => (
          <div key={day} className="workout-day">
            <strong>{day}:</strong> {exercises}
          </div>
        ))}
      </div>
      <button onClick={handleSave} className="save-plan-btn">Save Plan</button>
    </div>
  );
}

export default WorkoutPlanCard;
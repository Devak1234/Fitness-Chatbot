import '../styles/MealPlanCard.css';

function MealPlanCard({ plan, onSave }) {
  const handleSave = () => {
    onSave(plan);
  };

  return (
    <div className="meal-plan-card">
      <h3>Daily Meal Plan</h3>
      <div className="meals">
        <div className="meal">
          <strong>Breakfast:</strong> {plan.breakfast}
        </div>
        <div className="meal">
          <strong>Mid-morning snack:</strong> {plan.midMorningSnack}
        </div>
        <div className="meal">
          <strong>Lunch:</strong> {plan.lunch}
        </div>
        <div className="meal">
          <strong>Evening snack:</strong> {plan.eveningSnack}
        </div>
        <div className="meal">
          <strong>Dinner:</strong> {plan.dinner}
        </div>
      </div>
      <button onClick={handleSave} className="save-plan-btn">Save Plan</button>
    </div>
  );
}

export default MealPlanCard;
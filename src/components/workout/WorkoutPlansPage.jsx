import { useState } from 'react';
import { exercises } from '../../data/comprehensiveWorkoutsData';
import '../../styles/WorkoutPlansPage.css';

function WorkoutPlansPage({ onSelectPlan }) {
  const [goal, setGoal] = useState('strength');
  const [experience, setExperience] = useState('intermediate');
  const [daysPerWeek, setDaysPerWeek] = useState(4);

  const generatePlan = () => {
    const plan = {
      goal,
      experience,
      daysPerWeek,
      days: {}
    };

    if (goal === 'strength' && daysPerWeek === 6) {
      plan.days = {
        monday: { name: 'Chest + Triceps', exercises: getExercisesForDay(['Chest', 'Triceps']) },
        tuesday: { name: 'Back + Biceps', exercises: getExercisesForDay(['Back', 'Biceps']) },
        wednesday: { name: 'Legs + Abs', exercises: getExercisesForDay(['Legs', 'Abs']) },
        thursday: { name: 'Shoulders + Traps', exercises: getExercisesForDay(['Shoulders']) },
        friday: { name: 'Push (Chest, Shoulders, Triceps)', exercises: getExercisesForDay(['Chest', 'Shoulders', 'Triceps']) },
        saturday: { name: 'Pull (Back, Biceps, Rear Delts)', exercises: getExercisesForDay(['Back', 'Biceps']) }
      };
    } else if (goal === 'weight_loss' && daysPerWeek === 4) {
      plan.days = {
        monday: { name: 'Full Body (compound + light cardio)', exercises: getExercisesForDay(['Chest', 'Back', 'Legs']) },
        wednesday: { name: 'Upper Body + Core', exercises: getExercisesForDay(['Chest', 'Back', 'Shoulders', 'Abs']) },
        friday: { name: 'Lower Body + HIIT', exercises: getExercisesForDay(['Legs']) },
        saturday: { name: 'Cardio + Abs', exercises: getExercisesForDay(['Abs']) }
      };
    } else if (goal === 'weight_gain' && daysPerWeek === 5) {
      plan.days = {
        monday: { name: 'Chest + Triceps', exercises: getExercisesForDay(['Chest', 'Triceps']) },
        tuesday: { name: 'Back + Biceps', exercises: getExercisesForDay(['Back', 'Biceps']) },
        wednesday: { name: 'Rest', exercises: [] },
        thursday: { name: 'Legs', exercises: getExercisesForDay(['Legs']) },
        friday: { name: 'Shoulders + Abs', exercises: getExercisesForDay(['Shoulders', 'Abs']) },
        saturday: { name: 'Full Body', exercises: getExercisesForDay(['Chest', 'Back', 'Legs']) }
      };
    }

    return plan;
  };

  const getExercisesForDay = (muscles) => {
    const dayExercises = [];
    muscles.forEach(muscle => {
      const muscleExercises = exercises.filter(ex =>
        ex.primaryMuscle === muscle &&
        (experience === 'beginner' ? ex.difficulty === 'Beginner' : true)
      );
      if (muscleExercises.length > 0) {
        // Pick 1-2 exercises per muscle
        const selected = muscleExercises.slice(0, Math.min(2, muscleExercises.length));
        dayExercises.push(...selected);
      }
    });
    return dayExercises.slice(0, 6); // Max 6 exercises per day
  };

  const currentPlan = generatePlan();

  const handleUsePlan = () => {
    onSelectPlan(currentPlan);
    alert('Workout plan selected! Check the Chat sidebar or Progress tab.');
  };

  return (
    <div className="workout-plans-page">
      <h2>Weekly Workout Plans</h2>

      <div className="plan-filters">
        <div className="filter-group">
          <label>Goal:</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="strength">Strength Training</option>
            <option value="weight_gain">Weight Gain</option>
            <option value="weight_loss">Weight Loss</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Experience:</label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Days per week:</label>
          <select value={daysPerWeek} onChange={(e) => setDaysPerWeek(parseInt(e.target.value))}>
            <option value={3}>3 days</option>
            <option value={4}>4 days</option>
            <option value={5}>5 days</option>
            <option value={6}>6 days</option>
          </select>
        </div>
      </div>

      <div className="plan-preview">
        <h3>Your {goal.replace('_', ' ')} Plan ({daysPerWeek} days/week)</h3>
        <div className="plan-days">
          {Object.entries(currentPlan.days).map(([day, data]) => (
            <div key={day} className="plan-day-card">
              <h4>{day.charAt(0).toUpperCase() + day.slice(1)}: {data.name}</h4>
              <ul>
                {data.exercises.map(exercise => (
                  <li key={exercise.id}>
                    {exercise.name} - {exercise.recommendedSetsReps[goal.replace('_', '')] || exercise.recommendedSetsReps.strength}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button className="use-plan-btn" onClick={handleUsePlan}>
          Use this Weekly Plan
        </button>
      </div>

      <div className="safety-notice">
        <p><strong>Safety Notice:</strong> This workout guidance is general. Always warm up, use proper form, and consult a doctor or certified trainer if you have pain or health conditions.</p>
      </div>
    </div>
  );
}

export default WorkoutPlansPage;
import { useState } from 'react';
import '../../styles/ExerciseDetail.css';

function ExerciseDetail({ exercise, onAddToPlan, onClose }) {
  const [selectedDay, setSelectedDay] = useState('monday');

  const handleAddToPlan = () => {
    onAddToPlan(exercise, selectedDay);
    alert(`Added ${exercise.name} to ${selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#28a745';
      case 'intermediate': return '#ffc107';
      case 'advanced': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="exercise-detail-overlay" onClick={onClose}>
      <div className="exercise-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="exercise-header">
          <h2>{exercise.name}</h2>
          <div className="exercise-meta">
            <span
              className="difficulty-tag"
              style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
            >
              {exercise.difficulty}
            </span>
            <span className="equipment-tag">{exercise.equipment}</span>
          </div>
        </div>

        <div className="exercise-image-large">
          <img src={exercise.imageUrl || '/images/workouts/placeholder-workout.png'} alt={exercise.name} onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'} />
        </div>

        <div className="exercise-video">
          <iframe
            width="100%"
            height="315"
            src={exercise.videoUrl}
            title={`${exercise.name} tutorial`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="exercise-details">
          <div className="detail-section">
            <h3>Muscles Worked</h3>
            <p><strong>Primary:</strong> {exercise.primaryMuscle}</p>
            {exercise.subRegion && (
              <p><strong>Region:</strong> {exercise.subRegion}</p>
            )}
          </div>

          <div className="detail-section">
            <h3>Step-by-Step Instructions</h3>
            <ol>
              {exercise.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="detail-section">
            <h3>Tips</h3>
            <ul>
              {exercise.tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>Recommended Sets & Reps</h3>
            <div className="sets-reps">
              <div className="rep-option">
                <strong>Weight Gain:</strong> {exercise.recommendedSetsReps.weightGain}
              </div>
              <div className="rep-option">
                <strong>Weight Loss:</strong> {exercise.recommendedSetsReps.weightLoss}
              </div>
              <div className="rep-option">
                <strong>Strength:</strong> {exercise.recommendedSetsReps.strength}
              </div>
            </div>
          </div>

          <div className="exercise-actions">
            <button className="add-to-day-btn" onClick={handleAddToPlan}>
              Add to Day
            </button>
            <button className="favorite-btn" onClick={() => alert('Favorite feature coming soon!')}>
              ❤️ Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetail;
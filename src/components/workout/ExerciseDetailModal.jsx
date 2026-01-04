import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';
import { getFavorites, addFavoriteExercise, removeFavoriteExercise } from '../../services/storage';

const ExerciseDetailModal = ({
  isOpen,
  onClose,
  exercise,
  onAddToPlan,
  onToggleFavorite
}) => {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (exercise) {
      const favorites = getFavorites();
      setIsFavorite(favorites.exercises.includes(exercise.id));
    }
  }, [exercise]);

  const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  const handleAddToPlan = () => {
    onAddToPlan?.(exercise, selectedDay);
    onClose();
  };

  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    if (newFavoriteState) {
      addFavoriteExercise(exercise.id);
    } else {
      removeFavoriteExercise(exercise.id);
    }

    onToggleFavorite?.(exercise, newFavoriteState);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'var(--success)';
      case 'intermediate': return 'var(--warning)';
      case 'advanced': return 'var(--danger)';
      default: return 'var(--muted)';
    }
  };

  if (!exercise) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={exercise.name}
      size="large"
    >
      <div className="exercise-detail-modal">
        <div className="exercise-detail-header">
          <div className="exercise-image-section">
            <img
              src={exercise.imageUrl || '/images/workouts/placeholder-workout.png'}
              alt={exercise.name}
              className="exercise-detail-image"
              onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'}
            />
            <div className="exercise-actions">
              <IconButton
                onClick={handleToggleFavorite}
                variant={isFavorite ? "primary" : "ghost"}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? '❤️' : '🤍'}
              </IconButton>
            </div>
          </div>

          <div className="exercise-info-section">
            <div className="exercise-meta">
              <Badge
                variant="secondary"
                style={{ backgroundColor: getDifficultyColor(exercise.difficulty) }}
              >
                {exercise.difficulty}
              </Badge>
              <Badge variant="default">
                {exercise.equipment}
              </Badge>
            </div>

            <div className="exercise-muscles">
              <div className="muscle-info">
                <strong>Primary:</strong> {exercise.primaryMuscle}
                {exercise.subRegion && ` (${exercise.subRegion})`}
              </div>
            </div>

            <div className="day-selector">
              <label className="day-label">Add to Day:</label>
              <div className="day-buttons">
                {daysOfWeek.map(day => (
                  <Button
                    key={day}
                    size="small"
                    variant={selectedDay === day ? 'primary' : 'outline'}
                    onClick={() => setSelectedDay(day)}
                  >
                    {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="exercise-video-section">
          <h3>📹 Tutorial Video</h3>
          <div className="video-container">
            <iframe
              src={exercise.videoUrl}
              title={`${exercise.name} tutorial`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <div className="exercise-details">
          <div className="detail-section">
            <h3>📋 Step-by-Step Instructions</h3>
            <ol className="exercise-steps">
              {exercise.steps?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="detail-section">
            <h3>💡 Tips</h3>
            <ul className="exercise-tips">
              {exercise.tips?.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h3>🎯 Recommended Sets & Reps</h3>
            <div className="sets-reps-grid">
              <div className="rep-option">
                <strong>💪 Strength:</strong> {exercise.recommendedSetsReps?.strength || 'N/A'}
              </div>
              <div className="rep-option">
                <strong>🏗️ Muscle Gain:</strong> {exercise.recommendedSetsReps?.weightGain || 'N/A'}
              </div>
              <div className="rep-option">
                <strong>🔥 Weight Loss:</strong> {exercise.recommendedSetsReps?.weightLoss || 'N/A'}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <Button onClick={handleAddToPlan} variant="primary">
            ➕ Add to {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
          </Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExerciseDetailModal;
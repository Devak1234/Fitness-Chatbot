import { useState, useMemo } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import { exercises } from '../../data/workoutsData';

const ExerciseSwapModal = ({
  isOpen,
  onClose,
  currentExercise,
  day,
  onSwapExercise
}) => {
  const [selectedAlternative, setSelectedAlternative] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Find alternative exercises that match similar criteria
  const alternatives = useMemo(() => {
    if (!currentExercise) return [];

    return exercises.filter(exercise => {
      // Don't include the current exercise
      if (exercise.id === currentExercise.id) return false;

      // Match primary muscle group
      const muscleMatch = exercise.primaryMuscle === currentExercise.primaryMuscle;

      // Prefer same difficulty, but allow adjacent difficulties
      const difficultyMatch = exercise.difficulty === currentExercise.difficulty ||
        (currentExercise.difficulty === 'intermediate' &&
         (exercise.difficulty === 'beginner' || exercise.difficulty === 'advanced'));

      // Prefer same equipment type, but allow bodyweight alternatives
      const equipmentMatch = exercise.equipment === currentExercise.equipment ||
        (currentExercise.equipment !== 'Bodyweight' && exercise.equipment === 'Bodyweight');

      // Filter by search term if provided
      const searchMatch = !searchTerm ||
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.primaryMuscle.toLowerCase().includes(searchTerm.toLowerCase());

      return muscleMatch && difficultyMatch && equipmentMatch && searchMatch;
    }).slice(0, 6); // Limit to 6 alternatives
  }, [currentExercise, searchTerm]);

  const handleSwap = () => {
    if (selectedAlternative && onSwapExercise) {
      onSwapExercise(day, currentExercise, selectedAlternative);
      onClose();
    }
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

  if (!currentExercise) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🔄 Swap Exercise"
      size="large"
    >
      <div className="exercise-swap-modal">
        <div className="current-exercise-section">
          <h3>Current Exercise</h3>
          <Card className="current-exercise-card">
            <div className="exercise-swap-item">
              <img
                src={currentExercise.imageUrl || '/images/workouts/placeholder-workout.png'}
                alt={currentExercise.name}
                className="exercise-swap-image"
                onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'}
              />
              <div className="exercise-swap-info">
                <h4>{currentExercise.name}</h4>
                <div className="exercise-swap-meta">
                  <Badge variant={getDifficultyVariant(currentExercise.difficulty)} size="small">
                    {currentExercise.difficulty}
                  </Badge>
                  <Badge variant="default" size="small">
                    {currentExercise.equipment}
                  </Badge>
                </div>
                <p className="exercise-swap-muscle">
                  💪 {currentExercise.primaryMuscle}
                  {currentExercise.subRegion && ` (${currentExercise.subRegion})`}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="alternatives-section">
          <div className="alternatives-header">
            <h3>Alternative Exercises</h3>
            <div className="search-wrapper">
              <input
                type="text"
                placeholder="Search alternatives..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="alternatives-search"
              />
            </div>
          </div>

          <div className="alternatives-grid">
            {alternatives.map(exercise => (
              <Card
                key={exercise.id}
                className={`alternative-card ${selectedAlternative?.id === exercise.id ? 'selected' : ''}`}
                onClick={() => setSelectedAlternative(exercise)}
              >
                <div className="exercise-swap-item">
                  <img
                    src={exercise.imageUrl || '/images/workouts/placeholder-workout.png'}
                    alt={exercise.name}
                    className="exercise-swap-image"
                    onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'}
                  />
                  <div className="exercise-swap-info">
                    <h4>{exercise.name}</h4>
                    <div className="exercise-swap-meta">
                      <Badge variant={getDifficultyVariant(exercise.difficulty)} size="small">
                        {exercise.difficulty}
                      </Badge>
                      <Badge variant="default" size="small">
                        {exercise.equipment}
                      </Badge>
                    </div>
                    <p className="exercise-swap-muscle">
                      💪 {exercise.primaryMuscle}
                      {exercise.subRegion && ` (${exercise.subRegion})`}
                    </p>
                  </div>
                  {selectedAlternative?.id === exercise.id && (
                    <div className="selection-indicator">✓</div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {alternatives.length === 0 && (
            <Card>
              <div className="no-alternatives">
                <h4>🏋️ No alternatives found</h4>
                <p>Try adjusting your search or check back later for more exercises.</p>
              </div>
            </Card>
          )}
        </div>

        <div className="swap-actions">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleSwap}
            variant="primary"
            disabled={!selectedAlternative}
          >
            🔄 Swap Exercise
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExerciseSwapModal;
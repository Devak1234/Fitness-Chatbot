import { useState, useMemo, useEffect } from 'react';
import ExerciseCard from './ExerciseCard';
import ExerciseDetailModal from './ExerciseDetailModal';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

function WorkoutLibraryPage({ onSelectExercise }) {
  const [allExercises, setAllExercises] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState('Chest');
  const [goalFilter, setGoalFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  // Removed expandedSections state as we are simplifying the layout
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Lazy load workout data
    import('../../data/workoutsData').then(module => {
      setAllExercises(module.exercises);
      setMuscleGroups(module.muscleGroups);
      setLoading(false);
    });
  }, []);

  const filteredExercises = useMemo(() => {
    return allExercises.filter(exercise => {
      const matchesMuscle = exercise.primaryMuscle === selectedMuscle;
      const matchesGoal = goalFilter === 'all' || exercise.goalTags.some(tag => {
        const normalizedTag = tag.toLowerCase().replace(' ', '_');
        return normalizedTag === goalFilter;
      });
      const matchesEquipment = equipmentFilter === 'all' || exercise.equipment.toLowerCase() === equipmentFilter;

      return matchesMuscle && matchesGoal && matchesEquipment;
    });
  }, [selectedMuscle, goalFilter, equipmentFilter]);

  const exercisesBySubRegion = useMemo(() => {
    const grouped = {};
    filteredExercises.forEach(exercise => {
      const subRegion = exercise.subRegion || 'General';
      if (!grouped[subRegion]) {
        grouped[subRegion] = [];
      }
      grouped[subRegion].push(exercise);
    });
    return grouped;
  }, [filteredExercises]);

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };

  const handleAddToPlan = (exercise, day) => {
    console.log('Adding to plan:', exercise.name, 'on', day);
  };

  const handleToggleFavorite = (exercise, isFavorite) => {
    console.log('Toggling favorite for:', exercise.name, isFavorite);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-10 h-10 border-4 border-input border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-sub text-lg">Loading workout library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-main mb-2">🏋️ Workout Library</h1>
          <p className="text-sub text-lg">Discover exercises and build your perfect routine</p>
        </div>
        <div>
          <span className="px-4 py-2 rounded-full bg-card border border-border text-main font-semibold shadow-sm">
            {filteredExercises.length} Exercises Found
          </span>
        </div>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-sub uppercase tracking-wider">Target Muscle</h4>
            <div className="flex flex-wrap gap-2">
              {muscleGroups.map(muscle => (
                <button
                  key={muscle}
                  onClick={() => setSelectedMuscle(muscle)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${selectedMuscle === muscle
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-input text-sub border-transparent hover:bg-hover hover:text-main'
                    }`}
                >
                  {muscle}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div className="space-y-2">
              <label className="text-sm font-bold text-main">Goal Focus</label>
              <select
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-main focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value="all">Any Goal</option>
                <option value="strength">Strength</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="weight_loss">Weight Loss</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-main">Equipment Available</label>
              <select
                value={equipmentFilter}
                onChange={(e) => setEquipmentFilter(e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-main focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option value="all">Any Equipment</option>
                <option value="bodyweight">Bodyweight</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="barbell">Barbell</option>
                <option value="machine">Machine</option>
                <option value="cable">Cable</option>
                <option value="plate">Plate</option>
                <option value="bench">Bench</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        {filteredExercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-card rounded-2xl border border-dashed border-border text-center">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-xl font-bold text-main mb-2">No exercises found</h3>
            <p className="text-sub mb-6 max-w-md">Try adjusting your filters to find more exercises.</p>
            <button
              onClick={() => { setSelectedMuscle('Chest'); setGoalFilter('all'); setEquipmentFilter('all'); }}
              className="px-6 py-2 bg-input hover:bg-hover text-main font-medium rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          Object.entries(exercisesBySubRegion).map(([subRegion, exercises]) => (
            <div key={subRegion} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-main">{subRegion}</h2>
                <div className="h-px bg-border flex-1"></div>
                <span className="text-sm font-medium text-sub">{exercises.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map(exercise => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    onClick={() => handleExerciseClick(exercise)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <ExerciseDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercise={selectedExercise}
        onAddToPlan={handleAddToPlan}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default WorkoutLibraryPage;
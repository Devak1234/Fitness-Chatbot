import Badge from '../ui/Badge';
import Button from '../ui/Button';

function ExerciseCard({ exercise, onClick }) {
  const getDifficultyVariant = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer p-3 flex flex-col h-full group card-hover-effect"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-input mb-3">
        <img
          src={exercise.imageUrl || '/images/workouts/placeholder-workout.png'}
          alt={exercise.name}
          onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge variant={getDifficultyVariant(exercise.difficulty)} size="small" className="shadow-sm backdrop-blur-sm">
            {exercise.difficulty}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 gap-2 px-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-bold text-lg text-main leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {exercise.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2 mt-1">
          <span className="px-3 py-1 rounded-full bg-input text-sub text-xs font-semibold">
            {exercise.primaryMuscle}
          </span>
          <span className="px-3 py-1 rounded-full bg-input text-sub text-xs font-medium">
            {exercise.equipment}
          </span>
        </div>

        <div className="mt-auto pt-3">
          <Button
            size="small"
            variant="ghost"
            className="w-full justify-center bg-input/50 hover:bg-input text-sub hover:text-main rounded-xl"
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            View Guide
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard;
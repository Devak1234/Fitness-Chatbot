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
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full group card-hover-effect overflow-hidden"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden bg-input">
        <img
          src={exercise.imageUrl || '/images/workouts/placeholder-workout.png'}
          alt={exercise.name}
          onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={getDifficultyVariant(exercise.difficulty)} size="small" className="shadow-sm backdrop-blur-md border border-white/20">
            {exercise.difficulty}
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg leading-tight truncate drop-shadow-md text-white mb-1">{exercise.name}</h3>
          <span className="inline-block px-2 py-0.5 rounded-md bg-white/20 backdrop-blur-sm border border-white/10 text-[10px] font-semibold uppercase tracking-wider text-white/90">
            {exercise.equipment || 'No Equipment'}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Muscle Chips */}
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            {exercise.primaryMuscle}
          </span>
          {exercise.secondaryMuscles && exercise.secondaryMuscles.slice(0, 2).map(m => (
            <span key={m} className="px-2 py-1 rounded-md bg-input text-sub text-xs font-medium border border-border/50">
              {m}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-2">
          <Button
            size="small"
            variant="ghost"
            className="w-full justify-center bg-input hover:bg-input/80 text-main border border-border/50 rounded-xl py-2.5 font-medium transition-colors"
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
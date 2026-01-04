import Button from '../ui/Button';
import Badge from '../ui/Badge';

function FoodCard({ food, onClick, onAddToToday }) {
  const getCategoryBadges = () => {
    return food.tags?.slice(0, 3) || []; // Showing up to 3 tags
  };

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full group card-hover-effect overflow-hidden"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-input">
        <img
          src={food.imageUrl || '/images/foods/placeholder-food.png'}
          alt={food.name}
          onError={(e) => e.target.src = '/images/foods/placeholder-food.png'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90"></div>

        <div className="absolute top-3 right-3 z-10">
          <Badge variant="warning" size="small" className="font-bold shadow-sm backdrop-blur-md border border-white/20">
            {food.calories} Cal
          </Badge>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
          <h3 className="font-bold text-lg leading-tight truncate drop-shadow-md text-white mb-1">{food.name}</h3>
          <div className="flex flex-wrap gap-1 opacity-90">
            {getCategoryBadges().map(badge => (
              <span key={badge} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-sm border border-white/10">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 gap-4">
        {/* Macros Pills */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center justify-center p-2 bg-input/50 rounded-xl border border-border/50">
            <span className="text-sm font-bold text-main">{food.protein}g</span>
            <span className="text-[10px] text-sub uppercase font-bold tracking-wider">Prot</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-input/50 rounded-xl border border-border/50">
            <span className="text-sm font-bold text-main">{food.carbs || 0}g</span>
            <span className="text-[10px] text-sub uppercase font-bold tracking-wider">Carbs</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 bg-input/50 rounded-xl border border-border/50">
            <span className="text-sm font-bold text-main">{food.fat || 0}g</span>
            <span className="text-[10px] text-sub uppercase font-bold tracking-wider">Fat</span>
          </div>
        </div>

        {onAddToToday && (
          <div className="mt-auto pt-2">
            <Button
              size="small"
              className="w-full rounded-xl shadow-sm text-sm font-bold py-2.5"
              onClick={(e) => { e.stopPropagation(); onAddToToday(food); }}
            >
              Add to Log
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodCard;
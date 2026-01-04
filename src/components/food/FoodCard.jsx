import Button from '../ui/Button';
import Badge from '../ui/Badge';

function FoodCard({ food, onClick, onAddToToday }) {
  const getCategoryBadges = () => {
    return food.tags?.slice(0, 2) || [];
  };

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full group card-hover-effect overflow-hidden"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-input">
        <img
          src={food.imageUrl || '/images/foods/placeholder-food.png'}
          alt={food.name}
          onError={(e) => e.target.src = '/images/foods/placeholder-food.png'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>

        <div className="absolute top-3 right-3">
          <Badge variant="warning" size="small" className="font-bold shadow-sm backdrop-blur-sm">
            {food.calories} Cal
          </Badge>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg leading-tight truncate drop-shadow-md text-white">{food.name}</h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Macros Grid */}
        <div className="grid grid-cols-3 gap-2 bg-input/50 rounded-xl p-2 border border-border/50">
          <div className="flex flex-col items-center">
            <span className="text-sm font-bold text-main">{food.protein}g</span>
            <span className="text-[10px] uppercase tracking-wider text-sub font-semibold">Prot</span>
          </div>
          <div className="flex flex-col items-center border-l border-border/50">
            <span className="text-sm font-bold text-main">{food.carbs || 0}g</span>
            <span className="text-[10px] uppercase tracking-wider text-sub font-semibold">Carbs</span>
          </div>
          <div className="flex flex-col items-center border-l border-border/50">
            <span className="text-sm font-bold text-main">{food.fat || 0}g</span>
            <span className="text-[10px] uppercase tracking-wider text-sub font-semibold">Fats</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {getCategoryBadges().map(badge => (
            <span key={badge} className="px-2 py-1 rounded-md bg-input text-sub text-xs font-medium">
              {badge}
            </span>
          ))}
        </div>

        {onAddToToday && (
          <div className="pt-2">
            <Button
              size="small"
              className="w-full rounded-xl shadow-sm"
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
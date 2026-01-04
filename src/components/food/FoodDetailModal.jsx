import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';
import { getFavorites, addFavoriteFood, removeFavoriteFood } from '../../services/storage';

const FoodDetailModal = ({
  isOpen,
  onClose,
  food,
  onAddToMeal,
  onAskAI,
  onToggleFavorite
}) => {
  const [servingSize, setServingSize] = useState(100);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (food) {
      const favorites = getFavorites();
      setIsFavorite(favorites.foods.includes(food.id));
    }
  }, [food]);

  const calculateMacros = (baseValue) => {
    return ((baseValue * servingSize) / 100).toFixed(1);
  };

  const handleAddToMeal = () => {
    onAddToMeal({
      ...food,
      servingSize,
      calculatedMacros: {
        calories: calculateMacros(food.calories),
        protein: calculateMacros(food.protein),
        carbs: calculateMacros(food.carbs),
        fat: calculateMacros(food.fat)
      }
    });
  };

  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    if (newFavoriteState) {
      addFavoriteFood(food.id);
    } else {
      removeFavoriteFood(food.id);
    }

    onToggleFavorite?.(food, newFavoriteState);
  };

  if (!food) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={food.name}
      size="large"
    >
      <div className="food-detail-modal">
        <div className="food-detail-header">
          <div className="food-image-section">
            <img
              src={food.imageUrl || '/images/foods/placeholder-food.png'}
              alt={food.name}
              className="food-detail-image"
              onError={(e) => e.target.src = '/images/foods/placeholder-food.png'}
            />
            <div className="food-actions">
              <IconButton
                onClick={handleToggleFavorite}
                variant={isFavorite ? "primary" : "ghost"}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? '❤️' : '🤍'}
              </IconButton>
            </div>
          </div>

          <div className="food-info-section">
            <div className="food-tags">
              {food.tags?.map(tag => (
                <Badge key={tag} variant="secondary" size="small">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="serving-controls">
              <label className="serving-label">Serving Size:</label>
              <div className="serving-options">
                <Button
                  size="small"
                  variant={servingSize === 100 ? 'primary' : 'outline'}
                  onClick={() => setServingSize(100)}
                >
                  100g
                </Button>
                <Button
                  size="small"
                  variant={servingSize === 200 ? 'primary' : 'outline'}
                  onClick={() => setServingSize(200)}
                >
                  200g
                </Button>
                <Button
                  size="small"
                  variant={servingSize === 150 ? 'primary' : 'outline'}
                  onClick={() => setServingSize(150)}
                >
                  1 serving
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="nutrition-section">
          <h3>Nutrition Facts (per {servingSize}g)</h3>
          <div className="macros-grid">
            <div className="macro-card">
              <div className="macro-value">{calculateMacros(food.calories)}</div>
              <div className="macro-label">Calories</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{calculateMacros(food.protein)}g</div>
              <div className="macro-label">Protein</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{calculateMacros(food.carbs)}g</div>
              <div className="macro-label">Carbs</div>
            </div>
            <div className="macro-card">
              <div className="macro-value">{calculateMacros(food.fat)}g</div>
              <div className="macro-label">Fat</div>
            </div>
          </div>
        </div>

        <div className="nutrition-details">
          {food.vitamins && Object.keys(food.vitamins).length > 0 && (
            <div className="detail-section">
              <h4>🧬 Vitamins</h4>
              <div className="nutrition-tags">
                {Object.entries(food.vitamins).map(([vitamin, amount]) => (
                  <Badge key={vitamin} variant="default" size="small">
                    {vitamin} {amount}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {food.minerals && Object.keys(food.minerals).length > 0 && (
            <div className="detail-section">
              <h4>⚡ Minerals</h4>
              <div className="nutrition-tags">
                {Object.entries(food.minerals).map(([mineral, amount]) => (
                  <Badge key={mineral} variant="default" size="small">
                    {mineral} {amount}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <Button onClick={handleAddToMeal} variant="primary">
            ➕ Add to Today's Meal
          </Button>
          <Button onClick={() => onAskAI?.(food)} variant="outline">
            🤖 Ask AI About This Food
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FoodDetailModal;
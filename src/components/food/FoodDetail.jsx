import { useState } from 'react';
import '../../styles/FoodDetail.css';

function FoodDetail({ food, onAddToMeal, onAskAI, onClose }) {
  const [servingSize, setServingSize] = useState(100);

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

  return (
    <div className="food-detail-overlay" onClick={onClose}>
      <div className="food-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className="food-header">
          <img src={food.imageUrl || '/images/foods/placeholder-food.png'} alt={food.name} className="food-detail-image" onError={(e) => e.target.src = '/images/foods/placeholder-food.png'} />
          <div className="food-title">
            <h2>{food.name}</h2>
            <p className="food-description">{food.description}</p>
          </div>
        </div>

        <div className="serving-controls">
          <label>Serving Size:</label>
          <div className="serving-options">
            <button
              className={servingSize === 100 ? 'active' : ''}
              onClick={() => setServingSize(100)}
            >
              100g
            </button>
            <button
              className={servingSize === 200 ? 'active' : ''}
              onClick={() => setServingSize(200)}
            >
              200g
            </button>
            <button
              className={servingSize === food.per === '1 serving' ? 150 : 150 ? 'active' : ''}
              onClick={() => setServingSize(150)}
            >
              1 serving
            </button>
          </div>
        </div>

        <div className="macros-section">
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
          <div className="detail-section">
            <h4>Vitamins</h4>
            <div className="tags">
              {food.vitamins.map(vitamin => (
                <span key={vitamin} className="tag">{vitamin}</span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h4>Minerals</h4>
            <div className="tags">
              {food.minerals.map(mineral => (
                <span key={mineral} className="tag">{mineral}</span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h4>Health Benefits</h4>
            <ul>
              {food.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Best For</h4>
            <div className="tags">
              {food.bestFor.map(category => (
                <span key={category} className="tag">{category}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="add-to-meal-btn" onClick={handleAddToMeal}>
            Add to Meal Plan
          </button>
          <button className="ask-ai-btn" onClick={() => onAskAI(food)}>
            Ask AI about this food
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodDetail;
import { useState, useEffect } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import IconButton from './ui/IconButton';
import { getFavorites, addFavoriteFood, removeFavoriteFood, addFavoriteExercise, removeFavoriteExercise } from '../services/storage';
import { foods } from '../data/nutritionData';
import { exercises } from '../data/workoutsData';
import './FavoritesPanel.css';

const FavoritesPanel = ({ onSelectFood, onSelectExercise }) => {
  const [favorites, setFavorites] = useState({ foods: [], exercises: [] });
  const [activeTab, setActiveTab] = useState('foods');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const favoriteFoods = foods.filter(food => favorites.foods.includes(food.id));
  const favoriteExercises = exercises.filter(exercise => favorites.exercises.includes(exercise.id));

  const filteredFoods = favoriteFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExercises = favoriteExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFavoriteFood = (foodId) => {
    if (favorites.foods.includes(foodId)) {
      removeFavoriteFood(foodId);
      setFavorites(prev => ({
        ...prev,
        foods: prev.foods.filter(id => id !== foodId)
      }));
    } else {
      addFavoriteFood(foodId);
      setFavorites(prev => ({
        ...prev,
        foods: [...prev.foods, foodId]
      }));
    }
  };

  const handleToggleFavoriteExercise = (exerciseId) => {
    if (favorites.exercises.includes(exerciseId)) {
      removeFavoriteExercise(exerciseId);
      setFavorites(prev => ({
        ...prev,
        exercises: prev.exercises.filter(id => id !== exerciseId)
      }));
    } else {
      addFavoriteExercise(exerciseId);
      setFavorites(prev => ({
        ...prev,
        exercises: [...prev.exercises, exerciseId]
      }));
    }
  };

  const handleFoodClick = (food) => {
    onSelectFood?.(food);
  };

  const handleExerciseClick = (exercise) => {
    onSelectExercise?.(exercise);
  };

  return (
    <div className="favorites-panel">
      <div className="favorites-header">
        <h2>⭐ My Favorites</h2>
        <div className="favorites-stats">
          <Badge variant="secondary">{favorites.foods.length} foods</Badge>
          <Badge variant="secondary">{favorites.exercises.length} exercises</Badge>
        </div>
      </div>

      <div className="favorites-tabs">
        <button
          className={`favorites-tab ${activeTab === 'foods' ? 'active' : ''}`}
          onClick={() => setActiveTab('foods')}
        >
          🥗 Foods ({favorites.foods.length})
        </button>
        <button
          className={`favorites-tab ${activeTab === 'exercises' ? 'active' : ''}`}
          onClick={() => setActiveTab('exercises')}
        >
          🏋️ Exercises ({favorites.exercises.length})
        </button>
      </div>

      <div className="favorites-search">
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="favorites-search-input"
        />
      </div>

      <div className="favorites-content">
        {activeTab === 'foods' ? (
          <div className="favorites-foods">
            {filteredFoods.length === 0 ? (
              <div className="favorites-empty">
                <h3>🥗 No favorite foods yet</h3>
                <p>Start adding foods from the Nutrition Library to build your favorites list!</p>
                <Button onClick={() => window.location.hash = '#nutrition'} variant="outline">
                  Browse Nutrition Library
                </Button>
              </div>
            ) : (
              <div className="favorites-grid">
                {filteredFoods.map(food => (
                  <Card key={food.id} className="favorite-item-card">
                    <div className="favorite-item-header">
                      <img
                        src={food.imageUrl || '/images/foods/placeholder-food.png'}
                        alt={food.name}
                        className="favorite-item-image"
                        onError={(e) => e.target.src = '/images/foods/placeholder-food.png'}
                      />
                      <IconButton
                        onClick={() => handleToggleFavoriteFood(food.id)}
                        variant="ghost"
                        size="small"
                        title="Remove from favorites"
                      >
                        ❤️
                      </IconButton>
                    </div>
                    <div className="favorite-item-info">
                      <h4>{food.name}</h4>
                      <div className="favorite-item-meta">
                        <Badge variant="default" size="small">
                          {food.calories} cal
                        </Badge>
                        <Badge variant="secondary" size="small">
                          {food.protein}g protein
                        </Badge>
                      </div>
                      <div className="favorite-item-actions">
                        <Button size="small" onClick={() => handleFoodClick(food)}>
                          View Details
                        </Button>
                        <Button size="small" variant="outline">
                          Add to Today
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="favorites-exercises">
            {filteredExercises.length === 0 ? (
              <div className="favorites-empty">
                <h3>🏋️ No favorite exercises yet</h3>
                <p>Start adding exercises from the Workout Library to build your favorites list!</p>
                <Button onClick={() => window.location.hash = '#workout'} variant="outline">
                  Browse Workout Library
                </Button>
              </div>
            ) : (
              <div className="favorites-grid">
                {filteredExercises.map(exercise => (
                  <Card key={exercise.id} className="favorite-item-card">
                    <div className="favorite-item-header">
                      <img
                        src={exercise.imageUrl || '/images/workouts/placeholder-workout.png'}
                        alt={exercise.name}
                        className="favorite-item-image"
                        onError={(e) => e.target.src = '/images/workouts/placeholder-workout.png'}
                      />
                      <IconButton
                        onClick={() => handleToggleFavoriteExercise(exercise.id)}
                        variant="ghost"
                        size="small"
                        title="Remove from favorites"
                      >
                        ❤️
                      </IconButton>
                    </div>
                    <div className="favorite-item-info">
                      <h4>{exercise.name}</h4>
                      <div className="favorite-item-meta">
                        <Badge variant="default" size="small">
                          {exercise.equipment}
                        </Badge>
                        <Badge
                          variant={
                            exercise.difficulty === 'Beginner' ? 'success' :
                            exercise.difficulty === 'Intermediate' ? 'warning' : 'danger'
                          }
                          size="small"
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                      <div className="favorite-item-muscle">
                        💪 {exercise.primaryMuscle}
                        {exercise.subRegion && ` (${exercise.subRegion})`}
                      </div>
                      <div className="favorite-item-actions">
                        <Button size="small" onClick={() => handleExerciseClick(exercise)}>
                          View Details
                        </Button>
                        <Button size="small" variant="outline">
                          Add to Plan
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel;
import { useState, useMemo, useEffect } from 'react';
import FoodCard from './food/FoodCard';
import FoodDetailModal from './food/FoodDetailModal';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';

function NutritionPage({ onSelectFood, onGeneratePlan }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedFood, setSelectedFood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Lazy load nutrition data
    import('../data/nutritionData').then(module => {
      setFoods(module.foods);
      setLoading(false);
    });
  }, []);

  const categories = [
    { id: 'all', name: 'All Foods', emoji: '🍽️' },
    { id: 'high-protein', name: 'High Protein', emoji: '💪' },
    { id: 'low-calorie', name: 'Low Calorie', emoji: '🥗' },
    { id: 'vegetarian', name: 'Vegetarian', emoji: '🥕' },
    { id: 'vegan', name: 'Vegan', emoji: '🌱' },
    { id: 'weight-gain', name: 'Weight Gain', emoji: '📈' },
    { id: 'muscle-gain', name: 'Muscle Gain', emoji: '🏋️' }
  ];

  const filteredAndSortedFoods = useMemo(() => {
    let filtered = foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' ||
        (selectedCategory === 'high-protein' && food.tags?.includes('High Protein')) ||
        (selectedCategory === 'low-calorie' && food.calories < 200) ||
        (selectedCategory === 'vegetarian' && food.tags?.includes('Vegetarian')) ||
        (selectedCategory === 'vegan' && food.tags?.includes('Vegan')) ||
        (selectedCategory === 'weight-gain' && food.tags?.includes('Weight Gain')) ||
        (selectedCategory === 'muscle-gain' && food.tags?.includes('Muscle Gain'));

      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'protein') return b.protein - a.protein;
      if (sortBy === 'calories') return a.calories - b.calories;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, foods]);

  const handleFoodClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleAddToMeal = (foodData) => {
    console.log('Adding to meal:', foodData);
    setIsModalOpen(false);
  };

  const handleAskAI = (food) => {
    console.log('Asking AI about:', food.name);
    setIsModalOpen(false);
  };

  const handleToggleFavorite = (food, isFavorite) => {
    console.log('Toggling favorite for:', food.name, isFavorite);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-10 h-10 border-4 border-input border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-sub text-lg">Loading nutrition library...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-main mb-2">🥗 Nutrition Library</h1>
          <p className="text-sub text-lg">Discover nutritious foods and build healthy meal plans</p>
        </div>
        <div>
          <span className="px-4 py-2 rounded-full bg-card border border-border text-main font-semibold shadow-sm">
            {filteredAndSortedFoods.length} Foods Available
          </span>
        </div>
      </div>

      <Card>
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-sub">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search foods by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm text-main placeholder-sub"
            />
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-sub uppercase tracking-wider">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border flex items-center gap-2 ${selectedCategory === category.id
                    ? 'bg-primary text-white border-primary shadow-md transform scale-105'
                    : 'bg-input text-sub border-transparent hover:bg-hover hover:text-main'
                    }`}
                >
                  <span>{category.emoji}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <h4 className="text-sm font-bold text-sub uppercase tracking-wider shrink-0">Sort By</h4>
            <div className="flex gap-2">
              {[
                { id: 'name', label: 'Name' },
                { id: 'protein', label: 'Protein' },
                { id: 'calories', label: 'Calories' }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${sortBy === option.id
                    ? 'bg-card text-main shadow-sm border border-border ring-1 ring-border'
                    : 'text-sub hover:text-main hover:bg-input'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        {filteredAndSortedFoods.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-card rounded-2xl border border-dashed border-border text-center">
            <div className="text-6xl mb-4 opacity-50">🥗</div>
            <h3 className="text-xl font-bold text-main mb-2">No foods found</h3>
            <p className="text-sub mb-6 max-w-md">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="px-6 py-2 bg-input hover:bg-hover text-main font-medium rounded-xl transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedFoods.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                onClick={() => handleFoodClick(food)}
                onAddToToday={() => handleAddToMeal(food)}
              />
            ))}
          </div>
        )}
      </div>

      <FoodDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        food={selectedFood}
        onAddToMeal={handleAddToMeal}
        onAskAI={handleAskAI}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

export default NutritionPage;
import { useState } from 'react';
import { samplePlans } from '../data/plans';
import WorkoutPlansPage from './workout/WorkoutPlansPage';
import '../styles/PlansPage.css';

function PlansPage({ onSelectPlan, onSelectWorkoutPlan }) {
  const [activeSection, setActiveSection] = useState('diet');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = samplePlans.filter(plan => {
    const matchesSection = plan.type === activeSection;
    const matchesCategory = selectedCategory === 'All' || plan.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || plan.level === selectedLevel || plan.level === 'All Levels';
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSection && matchesCategory && matchesLevel && matchesSearch;
  });

  const categories = ['All', ...new Set(samplePlans.map(plan => plan.category))];
  const levels = ['All', ...new Set(samplePlans.map(plan => plan.level))];

  const handleSelect = (plan) => {
    if (plan.type === 'diet') {
      onSelectPlan(plan);
    } else {
      onSelectWorkoutPlan(plan);
    }
    // Show success message
    alert(`Selected: ${plan.name}\n\nThis plan is now active in your chat sidebar!`);
  };

  return (
    <div className="plans-page">
      <h1>Choose Your Plan</h1>
      <p className="page-description">Select from our curated collection of personalized fitness and nutrition plans</p>

      <div className="section-tabs">
        <button
          onClick={() => setActiveSection('diet')}
          className={activeSection === 'diet' ? 'active' : ''}
        >
          🍽️ Diet Plans
        </button>
        <button
          onClick={() => setActiveSection('workout')}
          className={activeSection === 'workout' ? 'active' : ''}
        >
          💪 Workout Plans
        </button>
      </div>

      {/* Search and Filters */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          <div className="filter-group">
            <label>Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Level:</label>
            <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)}>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="plans-grid">
        {filteredPlans.length > 0 ? (
          filteredPlans.map(plan => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="plan-badges">
                  <span className={`badge level-${plan.level.toLowerCase()}`}>{plan.level}</span>
                  <span className={`badge category-${plan.category.toLowerCase().replace(' ', '-')}`}>
                    {plan.category}
                  </span>
                </div>
              </div>

              <p className="plan-description">{plan.description}</p>

              <div className="plan-details">
                {plan.type === 'diet' ? (
                  <div className="diet-details">
                    <div className="detail-item">
                      <span>Calories:</span>
                      <strong>{plan.calories}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Protein:</span>
                      <strong>{plan.protein}g</strong>
                    </div>
                    <div className="detail-item">
                      <span>Duration:</span>
                      <strong>{plan.duration}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="workout-details">
                    <div className="detail-item">
                      <span>Days/Week:</span>
                      <strong>{plan.daysPerWeek}</strong>
                    </div>
                    <div className="detail-item">
                      <span>Duration:</span>
                      <strong>{plan.duration}</strong>
                    </div>
                  </div>
                )}
              </div>

              <div className="plan-benefits">
                <h4>Benefits:</h4>
                <ul>
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <button onClick={() => handleSelect(plan)} className="select-plan-btn">
                Select This Plan
              </button>
            </div>
          ))
        ) : (
          <div className="no-plans">
            <p>No plans match your current filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Workout Plans Section */}
      {activeSection === 'workout' && (
        <div className="workout-plans-section">
          <h2>Custom Workout Plans</h2>
          <WorkoutPlansPage onSelectPlan={onSelectWorkoutPlan} />
        </div>
      )}
    </div>
  );
}

export default PlansPage;
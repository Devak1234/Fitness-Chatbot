import { useState } from 'react';
import { exercises } from '../data/comprehensiveWorkoutsData';
import { foods } from '../data/nutritionData';
import { exerciseImages, foodImages, fallbackImages } from '../data/sampleImages';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import DayCard from '../components/ui/DayCard';
import ExerciseSwapModal from '../components/workout/ExerciseSwapModal';
import { getFitnessResponse } from '../utils/aiClient';

function WeeklyPlanPage({ profile, onSetActivePlan }) {
  const [planSettings, setPlanSettings] = useState({
    goal: profile?.goal || 'Weight Loss',
    experienceLevel: 'Beginner',
    daysPerWeek: '4 days',
    dietType: profile?.dietType || 'Veg',
    calorieTarget: ''
  });

  const [weeklyWorkoutPlan, setWeeklyWorkoutPlan] = useState(null);
  const [weeklyDietPlan, setWeeklyDietPlan] = useState(null);
  const [selectedWorkoutDay, setSelectedWorkoutDay] = useState(null);
  const [selectedDietDay, setSelectedDietDay] = useState(0);
  const [reviewResponse, setReviewResponse] = useState(null);
  const [isReviewLoading, setIsReviewLoading] = useState(false);
  const [swapModalData, setSwapModalData] = useState(null);

  const handleSettingChange = (field, value) => {
    setPlanSettings(prev => ({ ...prev, [field]: value }));
  };

  const generateWeeklyWorkoutPlan = () => {
    const { experienceLevel, daysPerWeek } = planSettings;
    const days = parseInt(daysPerWeek.split(' ')[0]);

    // Define workout splits based on days per week
    const workoutSplits = {
      3: [
        { day: 'Monday', focus: 'Full Body A', muscles: ['Chest', 'Back', 'Legs', 'Abs'] },
        { day: 'Wednesday', focus: 'Full Body B', muscles: ['Shoulders', 'Biceps', 'Triceps', 'Legs'] },
        { day: 'Friday', focus: 'Full Body C', muscles: ['Chest', 'Back', 'Abs', 'Legs'] }
      ],
      4: [
        { day: 'Monday', focus: 'Upper Body', muscles: ['Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps'] },
        { day: 'Tuesday', focus: 'Lower Body', muscles: ['Legs', 'Abs'] },
        { day: 'Thursday', focus: 'Push', muscles: ['Chest', 'Shoulders', 'Triceps'] },
        { day: 'Friday', focus: 'Pull', muscles: ['Back', 'Biceps', 'Abs'] }
      ],
      5: [
        { day: 'Monday', focus: 'Chest + Triceps', muscles: ['Chest', 'Triceps'] },
        { day: 'Tuesday', focus: 'Back + Biceps', muscles: ['Back', 'Biceps'] },
        { day: 'Wednesday', focus: 'Legs + Abs', muscles: ['Legs', 'Abs'] },
        { day: 'Thursday', focus: 'Shoulders + Abs', muscles: ['Shoulders', 'Abs'] },
        { day: 'Friday', focus: 'Full Body', muscles: ['Chest', 'Back', 'Legs'] }
      ],
      6: [
        { day: 'Monday', focus: 'Chest + Triceps', muscles: ['Chest', 'Triceps'] },
        { day: 'Tuesday', focus: 'Back + Biceps', muscles: ['Back', 'Biceps'] },
        { day: 'Wednesday', focus: 'Legs', muscles: ['Legs'] },
        { day: 'Thursday', focus: 'Shoulders + Abs', muscles: ['Shoulders', 'Abs'] },
        { day: 'Friday', focus: 'Full Body', muscles: ['Chest', 'Back', 'Legs'] },
        { day: 'Saturday', focus: 'Core + Cardio', muscles: ['Abs'] }
      ]
    };

    const selectedSplit = workoutSplits[days] || workoutSplits[4];

    const workoutPlan = selectedSplit.map(dayPlan => {
      // Filter exercises based on muscles and experience level
      const dayExercises = exercises.filter(ex =>
        dayPlan.muscles.includes(ex.primaryMuscle) &&
        ex.difficulty.toLowerCase() === experienceLevel.toLowerCase()
      ).slice(0, 5); // Limit to 5 exercises per day

      return {
        ...dayPlan,
        exercises: dayExercises
      };
    });

    setWeeklyWorkoutPlan(workoutPlan);
  };

  const generateWeeklyDietPlan = () => {
    const { dietType } = planSettings;
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const dietPlan = days.map(day => {
      // Filter foods based on diet type
      let availableFoods = foods.filter(food => {
        if (dietType === 'Veg' && food.dietType === 'Non-Veg') return false;
        if (dietType === 'Vegan' && (food.dietType === 'Non-Veg' || food.dietType === 'Egg')) return false;
        if (dietType === 'Egg' && food.dietType === 'Non-Veg') return false;
        return true;
      });

      // Select foods for each meal
      const breakfastFoods = availableFoods.filter(f => f.category.includes('High Protein')).slice(0, 2);
      const lunchFoods = availableFoods.filter(f => f.category.includes('Vegetarian')).slice(0, 3);
      const dinnerFoods = availableFoods.filter(f => f.category.includes('Vegetarian')).slice(3, 6);
      const snackFoods = availableFoods.filter(f => f.category.includes('Budget Foods')).slice(0, 2);

      // Calculate approximate nutrition
      const allMealFoods = [...breakfastFoods, ...lunchFoods, ...dinnerFoods, ...snackFoods];
      const totalCalories = allMealFoods.reduce((sum, food) => sum + food.calories, 0);
      const totalProtein = allMealFoods.reduce((sum, food) => sum + food.protein, 0);

      return {
        day,
        meals: {
          breakfast: breakfastFoods,
          midSnack: [snackFoods[0]].filter(Boolean),
          lunch: lunchFoods.slice(0, 3),
          eveningSnack: [snackFoods[1]].filter(Boolean),
          dinner: dinnerFoods.slice(0, 3)
        },
        approxCalories: Math.round(totalCalories * 0.8), // Adjust for realistic portions
        approxProtein: Math.round(totalProtein * 0.8)
      };
    });

    setWeeklyDietPlan(dietPlan);
  };

  const generatePlan = () => {
    generateWeeklyWorkoutPlan();
    generateWeeklyDietPlan();
  };

  const setAsActivePlan = () => {
    if (weeklyWorkoutPlan && weeklyDietPlan) {
      onSetActivePlan({
        workout: weeklyWorkoutPlan,
        diet: weeklyDietPlan,
        settings: planSettings
      });
      // Plan set as active
    }
  };

  const getRecommendedSetsReps = (exercise, goal) => {
    return exercise.recommendedSetsReps[goal.toLowerCase().replace(' / muscle gain', '').replace(' ', '')] ||
      exercise.recommendedSetsReps.weightLoss;
  };

  const getExerciseImage = (exerciseName) => {
    const key = exerciseName.toLowerCase().replace(/\s+/g, '_');
    return exerciseImages[key] || fallbackImages.exercise;
  };

  const getFoodImage = (foodName) => {
    const key = foodName.toLowerCase().replace(/\s+/g, '_');
    return foodImages[key] || fallbackImages.food;
  };

  const regenerateWorkoutDay = (dayIndex) => {
    // Regenerate exercises for that day
    const dayPlan = weeklyWorkoutPlan[dayIndex];
    const newExercises = exercises.filter(ex =>
      dayPlan.muscles.includes(ex.primaryMuscle) &&
      ex.difficulty.toLowerCase() === planSettings.experienceLevel.toLowerCase()
    ).slice(0, 5);
    setWeeklyWorkoutPlan(prev => prev.map((d, i) => i === dayIndex ? { ...d, exercises: newExercises } : d));
  };

  const regenerateDietDay = (dayIndex) => {
    // Regenerate diet for that day
    const day = weeklyDietPlan[dayIndex].day;
    let availableFoods = foods.filter(food => {
      if (planSettings.dietType === 'Veg' && food.dietType === 'Non-Veg') return false;
      if (planSettings.dietType === 'Vegan' && (food.dietType === 'Non-Veg' || food.dietType === 'Egg')) return false;
      if (planSettings.dietType === 'Egg' && food.dietType === 'Non-Veg') return false;
      return true;
    });

    const breakfastFoods = availableFoods.filter(f => f.category.includes('High Protein')).slice(0, 2);
    const lunchFoods = availableFoods.filter(f => f.category.includes('Vegetarian')).slice(0, 3);
    const dinnerFoods = availableFoods.filter(f => f.category.includes('Vegetarian')).slice(3, 6);
    const snackFoods = availableFoods.filter(f => f.category.includes('Budget Foods')).slice(0, 2);

    const allMealFoods = [...breakfastFoods, ...lunchFoods, ...dinnerFoods, ...snackFoods];
    const totalCalories = allMealFoods.reduce((sum, food) => sum + food.calories, 0);
    const totalProtein = allMealFoods.reduce((sum, food) => sum + food.protein, 0);

    const newDayPlan = {
      day,
      meals: {
        breakfast: breakfastFoods,
        midSnack: [snackFoods[0]].filter(Boolean),
        lunch: lunchFoods.slice(0, 3),
        eveningSnack: [snackFoods[1]].filter(Boolean),
        dinner: dinnerFoods.slice(0, 3)
      },
      approxCalories: Math.round(totalCalories * 0.8),
      approxProtein: Math.round(totalProtein * 0.8)
    };

    setWeeklyDietPlan(prev => prev.map((d, i) => i === dayIndex ? newDayPlan : d));
  };

  const handleSwapExercise = (dayIndex, currentExercise, newExercise) => {
    setWeeklyWorkoutPlan(prev => prev.map((day, i) =>
      i === dayIndex
        ? {
          ...day,
          exercises: day.exercises.map(ex =>
            ex.id === currentExercise.id ? newExercise : ex
          )
        }
        : day
    ));
  };

  const openSwapModal = (dayIndex, exerciseIndex) => {
    const dayPlan = weeklyWorkoutPlan[dayIndex];
    const exercise = dayPlan.exercises[exerciseIndex];
    setSwapModalData({
      dayIndex,
      exerciseIndex,
      currentExercise: exercise,
      dayName: dayPlan.day.toLowerCase()
    });
  };

  const handleReviewPlan = async () => {
    if (!weeklyWorkoutPlan || !weeklyDietPlan) return;

    setIsReviewLoading(true);
    try {
      const reviewMessage = `Please review this weekly fitness and diet plan for a ${profile.age} year old ${profile.gender} with goal ${planSettings.goal}, experience ${planSettings.experienceLevel}, ${planSettings.daysPerWeek} workout days, diet type ${planSettings.dietType}.

Workout Plan: ${JSON.stringify(weeklyWorkoutPlan)}

Diet Plan: ${JSON.stringify(weeklyDietPlan)}

Provide suggestions for improvements, balance, and any concerns.`;

      const response = await getFitnessResponse([{
        id: Date.now(),
        sender: 'user',
        text: reviewMessage,
        timestamp: new Date().toISOString()
      }], profile, {}, {});

      setReviewResponse(response);
    } catch {
      setReviewResponse('Sorry, unable to get review at this time.');
    } finally {
      setIsReviewLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-main">My Weekly Plan</h1>
          <p className="text-sub text-lg">Customize your personalized fitness roadmap</p>
        </div>
        {weeklyWorkoutPlan && weeklyDietPlan && (
          <div className="flex gap-3 shrink-0">
            <Button onClick={handleReviewPlan} variant="outline" disabled={isReviewLoading} className="shadow-sm">
              {isReviewLoading ? 'Getting Review...' : 'AI Review'}
            </Button>
            <Button onClick={() => alert('Export coming soon!')} variant="outline" className="shadow-sm">
              Export Plan
            </Button>
          </div>
        )}
      </div>

      {/* Plan Setup Card */}
      <Card title="Plan Configuration" subtitle="Define your goals and preferences">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-main">🎯 Primary Goal</label>
              <select
                value={planSettings.goal}
                onChange={(e) => handleSettingChange('goal', e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-main shadow-sm transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="Weight Gain">Weight Gain</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Strength / Muscle Gain">Strength & Muscle</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-main">💪 Experience Level</label>
              <select
                value={planSettings.experienceLevel}
                onChange={(e) => handleSettingChange('experienceLevel', e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-main shadow-sm transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-main">📅 Workout Frequency</label>
              <select
                value={planSettings.daysPerWeek}
                onChange={(e) => handleSettingChange('daysPerWeek', e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-main shadow-sm transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="3 days">3 days / week</option>
                <option value="4 days">4 days / week</option>
                <option value="5 days">5 days / week</option>
                <option value="6 days">6 days / week</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-main">🥗 Diet Preference</label>
              <select
                value={planSettings.dietType}
                onChange={(e) => handleSettingChange('dietType', e.target.value)}
                className="w-full px-4 py-2.5 bg-input border border-border rounded-xl text-main shadow-sm transition-all focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              >
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
                <option value="Egg">Eggetarian</option>
                <option value="Vegan">Vegan</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Button onClick={generatePlan} variant="primary" size="large" className="rounded-xl shadow-md transform hover:scale-105 transition-transform w-full md:w-auto px-12">
              Generate My Plan
            </Button>
          </div>
        </div>
      </Card>

      {/* Weekly Workout Plan */}
      {weeklyWorkoutPlan && (
        <Card title="Weekly Workout Schedule" subtitle={`${planSettings.daysPerWeek} • ${planSettings.experienceLevel}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyWorkoutPlan.map((dayPlan, index) => (
              <DayCard
                key={index}
                dayName={dayPlan.day}
                metaText={dayPlan.focus}
                isExpanded={selectedWorkoutDay === index}
                onView={() => setSelectedWorkoutDay(selectedWorkoutDay === index ? null : index)}
                onRegenerate={() => regenerateWorkoutDay(index)}
                onEdit={() => openSwapModal(index, 0)}
              >
                {selectedWorkoutDay === index && (
                  <div className="space-y-4 mt-4 animate-fade-in">
                    {dayPlan.exercises.map((exercise, idx) => (
                      <div key={idx} className="flex gap-4 p-3 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <img
                          src={getExerciseImage(exercise.name)}
                          alt={exercise.name}
                          className="w-16 h-16 rounded-lg object-cover bg-input shrink-0"
                          onError={(e) => { e.target.src = fallbackImages.exercise; }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-main truncate leading-tight mb-1">{exercise.name}</h4>
                          <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-xs font-medium mb-1.5">{exercise.primaryMuscle}</span>
                          <div className="flex items-center gap-3 text-xs text-sub">
                            <span>Sets: <span className="font-semibold text-main">{getRecommendedSetsReps(exercise, planSettings.goal)}</span></span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DayCard>
            ))}
          </div>
        </Card>
      )}

      {/* Weekly Diet Plan */}
      {weeklyDietPlan && (
        <Card title="Weekly Nutrition Plan" subtitle={`${planSettings.dietType} • Balanced for goals`}>
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {weeklyDietPlan.map((dayPlan, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${selectedDietDay === index ? 'bg-primary text-white ring-2 ring-primary ring-offset-1 dark:ring-offset-gray-900' : 'bg-input text-sub hover:bg-hover hover:text-main'}`}
                  onClick={() => setSelectedDietDay(index)}
                >
                  {dayPlan.day.slice(0, 3)}
                </button>
              ))}
            </div>

            {weeklyDietPlan[selectedDietDay] && (
              <div className="animate-fade-in space-y-6">
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <h3 className="text-xl font-bold text-main">{weeklyDietPlan[selectedDietDay].day}</h3>
                  <Button size="small" variant="ghost" onClick={() => regenerateDietDay(selectedDietDay)} className="text-sub hover:text-main">
                    🔄 Regenerate
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(weeklyDietPlan[selectedDietDay].meals).map(([mealType, foods]) => (
                    foods.length > 0 && (
                      <div key={mealType} className="p-5 bg-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xl">
                            {mealType === 'breakfast' ? '' : mealType === 'lunch' ? '🌞' : mealType === 'dinner' ? '🌙' : '🥪'}
                          </span>
                          <h4 className="text-base font-bold text-main capitalize">{mealType.replace(/([A-Z])/g, ' $1').trim()}</h4>
                        </div>
                        <ul className="space-y-3">
                          {foods.map((food, idx) => (
                            <li key={idx} className="flex gap-3 items-center group">
                              <img
                                src={getFoodImage(food.name)}
                                alt={food.name}
                                className="w-10 h-10 rounded-lg object-cover bg-input shrink-0 group-hover:scale-105 transition-transform"
                                onError={(e) => { e.target.src = fallbackImages.food; }}
                              />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-main truncate leading-tight">{food.name}</div>
                                <div className="text-xs text-sub mt-0.5">{food.calories} cal</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-medium opacity-80 mb-1">Daily Calories</div>
                    <div className="text-3xl font-bold">{weeklyDietPlan[selectedDietDay].approxCalories}</div>
                  </div>
                  <div className="text-center border-l border-white/20">
                    <div className="text-sm font-medium opacity-80 mb-1">Protein</div>
                    <div className="text-3xl font-bold">{weeklyDietPlan[selectedDietDay].approxProtein}g</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Set as Active Plan */}
      {weeklyWorkoutPlan && weeklyDietPlan && (
        <Card title="Activate Plan" subtitle="Start tracking this plan today">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 text-main"><span className="text-green-500">✓</span> Daily workout reminders</div>
              <div className="flex items-center gap-2 text-main"><span className="text-green-500">✓</span> Progress tracking integration</div>
              <div className="flex items-center gap-2 text-main"><span className="text-green-500">✓</span> AI Coach context awareness</div>
            </div>
            <Button onClick={setAsActivePlan} variant="primary" size="large" className="w-full md:w-auto rounded-xl shadow-lg px-8">
              Enable This Plan
            </Button>
          </div>
        </Card>
      )}

      {/* AI Coach Review */}
      {reviewResponse && (
        <Card title="AI Coach Analysis">
          <div className="prose dark:prose-invert max-w-none text-main whitespace-pre-wrap leading-relaxed">
            {reviewResponse}
          </div>
        </Card>
      )}

      {/* Exercise Swap Modal */}
      {swapModalData && (
        <ExerciseSwapModal
          isOpen={!!swapModalData}
          onClose={() => setSwapModalData(null)}
          currentExercise={swapModalData.currentExercise}
          day={swapModalData.dayName}
          onSwapExercise={(day, currentEx, newEx) =>
            handleSwapExercise(swapModalData.dayIndex, currentEx, newEx)
          }
        />
      )}
    </div>
  );
}

export default WeeklyPlanPage;
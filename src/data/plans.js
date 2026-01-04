export const samplePlans = [
  {
    id: 'weight-loss-beginner',
    name: 'Weight Loss - Beginner',
    type: 'diet',
    category: 'Weight Loss',
    level: 'Beginner',
    duration: '4 weeks',
    description: 'A gentle introduction to healthy eating for sustainable weight loss',
    calories: 1800,
    protein: 120,
    carbs: 180,
    fat: 60,
    details: {
      breakfast: 'Oatmeal with berries and a boiled egg',
      lunch: 'Grilled chicken salad with mixed vegetables',
      dinner: 'Fish with quinoa and steamed broccoli',
      snacks: 'Greek yogurt, apple, handful of almonds'
    },
    benefits: ['Sustainable weight loss', 'Improved energy', 'Better digestion'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400'
  },
  {
    id: 'weight-loss-intermediate',
    name: 'Weight Loss - Intermediate',
    type: 'diet',
    category: 'Weight Loss',
    level: 'Intermediate',
    duration: '6 weeks',
    description: 'Accelerated weight loss with balanced macros and portion control',
    calories: 1600,
    protein: 130,
    carbs: 150,
    fat: 55,
    details: {
      breakfast: 'Greek yogurt parfait with chia seeds',
      lunch: 'Turkey stir-fry with brown rice',
      dinner: 'Grilled salmon with sweet potato and asparagus',
      snacks: 'Protein shake, carrot sticks with hummus'
    },
    benefits: ['Faster results', 'Muscle preservation', 'Metabolic boost'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400'
  },
  {
    id: 'muscle-gain-beginner',
    name: 'Muscle Gain - Beginner',
    type: 'diet',
    category: 'Muscle Gain',
    level: 'Beginner',
    duration: '8 weeks',
    description: 'High-protein, calorie-dense meals for building muscle mass',
    calories: 2800,
    protein: 180,
    carbs: 300,
    fat: 100,
    details: {
      breakfast: 'Eggs, whole grain toast, avocado',
      lunch: 'Chicken breast, rice, vegetables',
      dinner: 'Salmon, sweet potato, salad',
      snacks: 'Protein shake, peanut butter sandwich, banana'
    },
    benefits: ['Muscle growth', 'Strength increase', 'Recovery support'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'muscle-gain-advanced',
    name: 'Muscle Gain - Advanced',
    type: 'diet',
    category: 'Muscle Gain',
    level: 'Advanced',
    duration: '12 weeks',
    description: 'Optimized nutrition for serious muscle building and performance',
    calories: 3200,
    protein: 220,
    carbs: 350,
    fat: 120,
    details: {
      breakfast: 'Oatmeal with whey protein, eggs, fruit',
      lunch: 'Lean beef, brown rice, broccoli',
      dinner: 'Tuna steak, quinoa, mixed vegetables',
      snacks: 'Cottage cheese, protein bar, nuts, fruit'
    },
    benefits: ['Maximum muscle growth', 'Peak performance', 'Hormone optimization'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'maintenance-balanced',
    name: 'Maintenance - Balanced',
    type: 'diet',
    category: 'Maintenance',
    level: 'All Levels',
    duration: 'Ongoing',
    description: 'Balanced nutrition to maintain current weight and health',
    calories: 2200,
    protein: 140,
    carbs: 250,
    fat: 75,
    details: {
      breakfast: 'Smoothie with protein powder, fruit',
      lunch: 'Grilled chicken wrap with vegetables',
      dinner: 'Baked cod with couscous and salad',
      snacks: 'Cheese stick, apple, yogurt'
    },
    benefits: ['Weight stability', 'Nutrient balance', 'Energy maintenance'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400'
  },
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    type: 'workout',
    category: 'Strength Training',
    level: 'Beginner',
    duration: '4 weeks',
    daysPerWeek: 3,
    description: 'Complete full-body workouts for beginners',
    details: {
      monday: 'Push-ups 3x10, Squats 3x15, Plank 3x30s',
      wednesday: 'Dumbbell press 3x12, Lunges 3x10 each leg, Rows 3x12',
      friday: 'Burpees 3x8, Deadlifts 3x10, Mountain climbers 3x20'
    },
    benefits: ['Full body strength', 'Improved fitness', 'Foundation building'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'intermediate-split',
    name: 'Intermediate Split',
    type: 'workout',
    category: 'Strength Training',
    level: 'Intermediate',
    duration: '6 weeks',
    daysPerWeek: 4,
    description: '4-day split routine for intermediate lifters',
    details: {
      monday: 'Chest: Bench press 4x8-10, Incline press 3x10, Flyes 3x12',
      tuesday: 'Back: Pull-ups 3x8, Rows 4x10, Face pulls 3x12',
      thursday: 'Legs: Squats 4x8, Lunges 3x10 each, Calf raises 4x15',
      friday: 'Shoulders: Overhead press 4x8, Lateral raises 3x12, Rear delt 3x12'
    },
    benefits: ['Muscle isolation', 'Progressive overload', 'Balanced development'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'advanced-powerlifting',
    name: 'Advanced Powerlifting',
    type: 'workout',
    category: 'Strength Training',
    level: 'Advanced',
    duration: '8 weeks',
    daysPerWeek: 4,
    description: 'Heavy compound lifts for maximum strength gains',
    details: {
      monday: 'Squat 5x3, Bench press 5x3, Rows 4x6',
      tuesday: 'Deadlift 5x3, Overhead press 4x4, Pull-ups 4x6',
      thursday: 'Front squat 4x4, Close-grip bench 4x4, Face pulls 3x10',
      friday: 'Power clean 5x2, Dips 4x6, Calf raises 4x8'
    },
    benefits: ['Maximum strength', 'Power development', 'Competition prep'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio Blast',
    type: 'workout',
    category: 'Cardio',
    level: 'All Levels',
    duration: '4 weeks',
    daysPerWeek: 3,
    description: 'High-intensity interval training for fat loss and cardio fitness',
    details: {
      monday: '30s sprint/30s rest x 10, Burpees x 20, Mountain climbers x 30s',
      wednesday: 'Jump rope 3 min, High knees 1 min, Jumping jacks 1 min',
      friday: 'Circuit: Push-ups, Squats, Planks - 45s each, 15s rest, repeat 4x'
    },
    benefits: ['Fat loss', 'Cardiovascular health', 'Time efficient'],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'
  },
  {
    id: 'yoga-flexibility',
    name: 'Yoga & Flexibility',
    type: 'workout',
    category: 'Flexibility',
    level: 'All Levels',
    duration: '6 weeks',
    daysPerWeek: 3,
    description: 'Yoga poses and stretches for improved flexibility and mindfulness',
    details: {
      monday: 'Sun salutations x 5, Warrior poses, Tree pose, Downward dog',
      wednesday: 'Hip openers, Spinal twists, Shoulder stretches, Child pose',
      friday: 'Balance poses, Backbends, Forward folds, Corpse pose'
    },
    benefits: ['Flexibility', 'Stress reduction', 'Mind-body connection'],
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400'
  }
];

export const getPlansByCategory = (category) => {
  return samplePlans.filter(plan => plan.category === category);
};

export const getPlansByType = (type) => {
  return samplePlans.filter(plan => plan.type === type);
};

export const getPlansByLevel = (level) => {
  return samplePlans.filter(plan => plan.level === level || plan.level === 'All Levels');
};

export const getPlanById = (id) => {
  return samplePlans.find(plan => plan.id === id);
};
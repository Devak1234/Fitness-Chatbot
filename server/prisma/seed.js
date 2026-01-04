const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Nutrition seed
  const nutritionData = [
    { name: 'Grilled Chicken Breast', protein: 31.0, calories: 165, category: 'Protein', imageUrl: 'https://images.unsplash.com/photo-1532634726-8b4f5f5e8b8?w=400' },
    { name: 'Greek Yogurt', protein: 10.0, calories: 100, category: 'Dairy', imageUrl: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400' },
    { name: 'Quinoa', protein: 14.1, calories: 222, category: 'Grain', imageUrl: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400' },
    { name: 'Salmon Fillet', protein: 25.4, calories: 206, category: 'Protein', imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400' },
    { name: 'Spinach Salad', protein: 2.9, calories: 23, category: 'Vegetable', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400' },
    { name: 'Almonds', protein: 21.2, calories: 579, category: 'Nut', imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400' },
    { name: 'Eggs', protein: 6.3, calories: 155, category: 'Protein', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { name: 'Oatmeal', protein: 5.0, calories: 150, category: 'Grain', imageUrl: 'https://images.unsplash.com/photo-1504712598893-8bacd8a23fbe?w=400' },
    { name: 'Tuna', protein: 29.0, calories: 184, category: 'Protein', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400' },
    { name: 'Broccoli', protein: 2.8, calories: 55, category: 'Vegetable', imageUrl: 'https://images.unsplash.com/photo-1459411621453-7e297dc41774?w=400' },
  ];

  // Workouts seed
  const workoutData = [
    { slug: 'push-ups', title: 'Push-Ups', primary: 'Chest', equipment: 'None', level: 'Beginner', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'A classic bodyweight exercise for chest and triceps.' },
    { slug: 'squats', title: 'Squats', primary: 'Legs', equipment: 'None', level: 'Beginner', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Strengthen your lower body with this fundamental move.' },
    { slug: 'planks', title: 'Planks', primary: 'Core', equipment: 'None', level: 'Intermediate', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Build core stability and endurance.' },
    { slug: 'burpees', title: 'Burpees', primary: 'Full Body', equipment: 'None', level: 'Advanced', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'A high-intensity full-body exercise.' },
    { slug: 'lunges', title: 'Lunges', primary: 'Legs', equipment: 'None', level: 'Beginner', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Target quads, glutes, and hamstrings.' },
    { slug: 'pull-ups', title: 'Pull-Ups', primary: 'Back', equipment: 'Bar', level: 'Intermediate', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', description: 'Build upper body pulling strength.' },
  ];

  await prisma.nutrition.createMany({ data: nutritionData });
  await prisma.workout.createMany({ data: workoutData });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
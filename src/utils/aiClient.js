/**
 * Comprehensive system prompt for accurate, safe fitness and nutrition advice
 * This prompt ensures the AI provides structured, personalized, and safe responses
 * based on user profile, workout data, and nutrition information
 */
const FITNESS_SYSTEM_PROMPT = `
You are a professional Fitness & Nutrition Coach AI assistant for a web app.
Your job is to give practical, safe, and realistic advice about:
- Workout plans (Monday–Saturday splits, from beginner to advanced)
- Muscle-specific workouts (chest, abs, obliques, shoulders, biceps, triceps, lats, back, legs)
- Basic nutrition, diet plans, and healthy habits

You have access to three categories of information:
1) User profile (age, gender, height, weight, goal: weight gain / weight loss / strength, activity level, diet type: veg/non-veg, experience level).
2) Nutrition data (foods with calories, protein, carbs, fats, and tags like high protein, weight loss friendly, vegetarian, etc.).
3) Workout data (exercises with target muscles, difficulty, equipment, and goal tags like gain/loss/strength).

RULES:
- Always look at the user's goal and profile first, then give advice.
- If an important detail is missing (goal, weight, experience level, injuries, etc.), ask a SHORT follow-up question before giving a full plan.
- Prefer simple, sustainable plans. No extreme diets or dangerous workout advice.
- For diet plans, use simple Indian-friendly foods like: rice, chapati, dal, paneer, curd, eggs, chicken, banana, oats, nuts, etc.
- For diet plans, format your answer as:
    Breakfast:
    Mid-morning snack:
    Lunch:
    Evening snack:
    Dinner:
- For workout plans, format as:
    Monday:
    Tuesday:
    Wednesday:
    Thursday:
    Friday:
    Saturday:
- When user asks about a specific muscle (e.g. "chest workout for beginners"), choose exercises from the provided workout list that match that muscle and difficulty level.
- When user asks about a food ("chicken nutrition", "is paneer good for weight gain?"), use nutrition data if available. If not available, say you don't have that exact data in this app instead of guessing.
- If the user has serious pain, injury, or medical conditions, tell them to consult a doctor or certified trainer before following any plan.
- Do NOT answer unrelated topics (politics, news, random jokes). If asked, say: "I am only a fitness and nutrition assistant in this app."

STYLE:
- Use simple English.
- Use short paragraphs and bullet points.
- Be encouraging and supportive.

Always end your answer with:
"Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance."
`;

/**
 * Enhanced AI response function with comprehensive context
 * @param {Array} messages - Chat history messages
 * @param {Object} profile - User profile data
 * @param {Object} nutritionContext - Selected foods, current diet plan
 * @param {Object} workoutContext - Selected workout plan, exercises, day
 * @returns {string} AI response text
 */
export async function getFitnessResponse(messages, profile, nutritionContext = null, workoutContext = null) {
  // Get the latest user message
  const latestMessage = messages[messages.length - 1];
  if (!latestMessage || latestMessage.sender !== 'user') return 'Invalid message';

  // Build structured request body with comprehensive context
  const requestBody = {
    system: FITNESS_SYSTEM_PROMPT,
    profile: profile || null,
    nutritionContext: nutritionContext || null,
    workoutContext: workoutContext || null,
    chatHistory: messages ? messages.slice(-8) : [] // Last 8 messages for context
  };

  // Calculate BMR and daily calories if profile is available
  let calculatedData = null;
  if (profile && profile.height && profile.weight && profile.age && profile.gender) {
    const calculateBMR = () => {
      const { gender, weight, height, age } = profile;
      if (gender === 'Male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
    };

    const activityFactors = {
      Sedentary: 1.2,
      Light: 1.375,
      Moderate: 1.55,
      Heavy: 1.725
    };

    const bmr = calculateBMR();
    const tdee = bmr * activityFactors[profile.activityLevel] || 1.2;
    let dailyCalories;
    if (profile.goal === 'Weight Loss') {
      dailyCalories = tdee - 500;
    } else if (profile.goal === 'Weight Gain') {
      dailyCalories = tdee + 500;
    } else {
      dailyCalories = tdee;
    }

    calculatedData = {
      bmr: bmr.toFixed(0),
      tdee: tdee.toFixed(0),
      dailyCalories: dailyCalories.toFixed(0)
    };
  }

  // Build payload for AI API
  const payload = {
    model: 'gpt-3.5-turbo', // Example, replace with actual model
    messages: [
      { role: 'system', content: FITNESS_SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Context: ${JSON.stringify(requestBody)}\n${calculatedData ? `Calculated: BMR ${calculatedData.bmr}, TDEE ${calculatedData.tdee}, Daily calories ${calculatedData.dailyCalories}\n` : ''}User message: ${latestMessage.text}`
      }
    ],
    max_tokens: 600
  };

  // TODO: Replace this mock with real AI API call
  // Example: const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // Set API key in environment variables
  //   },
  //   body: JSON.stringify(payload)
  // });
  // const data = await response.json();
  // return data.choices[0].message.content;

  // Enhanced mock response with better personalization and structured plans
  let response = '';

  // Check for missing profile info
  const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'goal', 'activityLevel', 'dietType'];
  const missing = requiredFields.filter(field => !profile || !profile[field]);
  if (missing.length > 0) {
    return `Please complete your profile first. Missing: ${missing.join(', ')}. Fill in the details in the Profile section to get personalized recommendations.`;
  }

  const avoidAllergens = profile.allergies ? profile.allergies.split(',').map(a => a.trim().toLowerCase()) : [];
  const hasNuts = avoidAllergens.includes('nuts');

  if (latestMessage.text.toLowerCase().includes('diet') || latestMessage.text.toLowerCase().includes('meal')) {
    const goal = profile.goal === 'Weight Gain' ? 'Weight gain plan' : profile.goal === 'Weight Loss' ? 'Weight loss plan' : 'Strength training plan';
    response = `Based on your profile (${profile.name}, ${profile.age} years, ${profile.goal.toLowerCase()} goal), here are three ${goal} options:\n\n`;
    response += `Plan A: High-Calorie Balanced Gain Plan\n`;
    response += `Breakfast: Oats with banana${hasNuts ? '' : ' and almonds'} (~350 calories)\n`;
    response += `Mid-morning snack: Apple with peanut butter\n`;
    response += `Lunch: Brown rice, chicken curry, mixed vegetables\n`;
    response += `Evening snack: Banana milkshake\n`;
    response += `Dinner: Chapati with paneer butter masala\n\n`;

    response += `Plan B: Calorie-Controlled Loss Plan\n`;
    response += `Breakfast: Green tea, boiled eggs, whole wheat toast (~300 calories)\n`;
    response += `Mid-morning snack: Apple\n`;
    response += `Lunch: Grilled chicken salad, brown rice (~450 calories)\n`;
    response += `Evening snack: Carrot sticks with hummus\n`;
    response += `Dinner: Fish, steamed vegetables (~400 calories)\n\n`;

    response += `Plan C: Vegetarian Balanced Plan\n`;
    response += `Breakfast: Poha with peanuts and banana (~400 calories)\n`;
    response += `Mid-morning snack: Banana and curd\n`;
    response += `Lunch: Rice, dal, paneer sabzi, salad\n`;
    response += `Evening snack: Sweet potato and curd\n`;
    response += `Dinner: Chapati, mixed vegetable curry\n\n`;

    response += `Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  } else if (latestMessage.text.toLowerCase().includes('workout') || latestMessage.text.toLowerCase().includes('exercise')) {
    const goal = profile.goal === 'Weight Gain' ? 'Weight gain plan' : profile.goal === 'Weight Loss' ? 'Weight loss plan' : 'Strength training plan';
    response = `Here are three ${goal} workout plan options:\n\n`;

    if (profile.activityLevel === 'Sedentary') {
      response += `Plan A: Beginner Full Body (3 days/week)\n`;
      response += `Monday: Push-ups 2x8, Squats 2x10, Plank 2x20s\n`;
      response += `Tuesday: Rest or light walk\n`;
      response += `Wednesday: Lunges 2x8 each leg, Bird-dog 2x10 each side\n`;
      response += `Thursday: Rest\n`;
      response += `Friday: Wall push-ups 2x10, Glute bridges 2x12\n`;
      response += `Saturday: Active rest - yoga or stretching\n`;
      response += `Sunday: Full rest\n\n`;

      response += `Plan B: Beginner Upper/Lower Split (4 days/week)\n`;
      response += `Monday: Upper - Push-ups 2x8, Dumbbell rows 2x10\n`;
      response += `Tuesday: Lower - Squats 2x10, Lunges 2x8 each leg\n`;
      response += `Wednesday: Rest\n`;
      response += `Thursday: Upper - Push-ups 2x8, Plank 2x20s\n`;
      response += `Friday: Lower - Squats 2x10, Glute bridges 2x12\n`;
      response += `Saturday: Light cardio\n`;
      response += `Sunday: Rest\n\n`;

      response += `Plan C: Beginner Circuit Training (3 days/week)\n`;
      response += `Monday: Circuit - Push-ups 2x6, Squats 2x8, Plank 2x15s, Jumping jacks 2x20\n`;
      response += `Tuesday: Rest\n`;
      response += `Wednesday: Circuit - Lunges 2x6 each leg, Bird-dog 2x8 each side, Mountain climbers 2x10\n`;
      response += `Thursday: Rest\n`;
      response += `Friday: Circuit - Push-ups 2x6, Squats 2x8, Plank 2x15s\n`;
      response += `Saturday: Active recovery\n`;
      response += `Sunday: Rest\n\n`;
    } else {
      response += `Plan A: Intermediate Push/Pull/Legs Split\n`;
      response += `Monday: Chest/Triceps - Push-ups 3x12, Dumbbell press 3x10, Tricep dips 3x10\n`;
      response += `Tuesday: Back/Biceps - Pull-ups 3x8, Dumbbell rows 3x10, Bicep curls 3x12\n`;
      response += `Wednesday: Rest or light cardio\n`;
      response += `Thursday: Legs - Squats 3x12, Lunges 3x10 each leg, Calf raises 3x15\n`;
      response += `Friday: Shoulders/Abs - Overhead press 3x10, Lateral raises 3x12, Planks 3x30s\n`;
      response += `Saturday: Full body compound lifts\n`;
      response += `Sunday: Rest\n\n`;

      response += `Plan B: Intermediate Upper/Lower Split\n`;
      response += `Monday: Upper - Bench press 3x10, Pull-ups 3x8, Overhead press 3x10\n`;
      response += `Tuesday: Lower - Squats 3x12, Deadlifts 3x8, Lunges 3x10 each leg\n`;
      response += `Wednesday: Rest\n`;
      response += `Thursday: Upper - Dumbbell press 3x10, Rows 3x10, Lateral raises 3x12\n`;
      response += `Friday: Lower - Front squats 3x10, Romanian deadlifts 3x10, Calf raises 3x15\n`;
      response += `Saturday: Conditioning or sports\n`;
      response += `Sunday: Rest\n\n`;

      response += `Plan C: Intermediate Full Body (4 days/week)\n`;
      response += `Monday: Squats 3x10, Bench press 3x10, Pull-ups 3x8, Planks 3x30s\n`;
      response += `Tuesday: Rest\n`;
      response += `Wednesday: Deadlifts 3x8, Overhead press 3x10, Lunges 3x10 each leg\n`;
      response += `Thursday: Rest\n`;
      response += `Friday: Squats 3x10, Dumbbell press 3x10, Rows 3x10, Russian twists 3x15\n`;
      response += `Saturday: Light conditioning\n`;
      response += `Sunday: Rest\n\n`;
    }

    response += `Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  } else if (latestMessage.text.toLowerCase().includes('chest')) {
    response = `For chest workouts, focus on compound movements first:\n\n`;
    response += `Beginner: Push-ups, Wall push-ups, Dumbbell flyes\n`;
    response += `Intermediate: Bench press, Incline press, Cable crossovers\n`;
    response += `Advanced: Barbell bench press, Dips, Decline press\n\n`;
    response += `Train chest 1-2 times per week with 3-4 sets of 8-12 reps.\n`;
    response += `Focus on full range of motion and controlled movements.\n\n`;
    response += `Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  } else if (latestMessage.text.toLowerCase().includes('abs') || latestMessage.text.toLowerCase().includes('core')) {
    response = `For abs/core training, combine different exercises:\n\n`;
    response += `• Planks: 3 sets of 20-60 seconds\n`;
    response += `• Crunches: 3 sets of 10-15 reps\n`;
    response += `• Leg raises: 3 sets of 8-12 reps\n`;
    response += `• Russian twists: 3 sets of 10-15 reps per side\n`;
    response += `• Bicycle crunches: 3 sets of 10-15 reps per side\n\n`;
    response += `Train abs 2-3 times per week, not daily. Focus on diet for visible results!\n\n`;
    response += `Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  } else if (latestMessage.text.toLowerCase().includes('lazy') || latestMessage.text.toLowerCase().includes('motivat') || latestMessage.text.toLowerCase().includes('tired')) {
    response = `I understand feeling unmotivated sometimes! Here's how to get started:\n\n`;
    response += `• Start small: Just 5-10 minutes of movement today\n`;
    response += `• Set micro-goals: "I'll do 10 push-ups" instead of "I'll workout for an hour"\n`;
    response += `• Remember your why: Your ${profile.goal.toLowerCase()} goal is worth it!\n`;
    response += `• Track progress: Use the Progress tab to see your improvements\n`;
    response += `• Be consistent: Better to do something daily than perfect workouts weekly\n\n`;
    response += `You've got this! Every expert was once a beginner. 💪\n\n`;
    response += `Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  } else if (latestMessage.text.toLowerCase().includes('nutrition') || latestMessage.text.toLowerCase().includes('protein') || latestMessage.text.toLowerCase().includes('calories')) {
    response = `Based on your profile, here's some nutrition guidance:\n\n`;
    if (profile.goal === 'Weight Gain') {
      response += `• Aim for ${calculatedData?.dailyCalories || '2500+'} calories daily\n`;
      response += `• Focus on protein: 1.6-2.2g per kg of body weight\n`;
      response += `• Include healthy fats and complex carbs\n`;
      response += `• Good sources: Chicken, eggs, paneer, nuts, rice, potatoes\n`;
    } else if (profile.goal === 'Weight Loss') {
      response += `• Aim for ${calculatedData?.dailyCalories || '1800-2200'} calories daily\n`;
      response += `• Create 500 calorie deficit for 0.5kg/week loss\n`;
      response += `• High protein, moderate carbs, healthy fats\n`;
      response += `• Focus on whole foods and portion control\n`;
    } else {
      response += `• Aim for ${calculatedData?.dailyCalories || 'maintenance'} calories\n`;
      response += `• Balanced macros: 40% carbs, 30% protein, 30% fats\n`;
      response += `• Include all food groups for optimal health\n`;
    }
    response += `\n\nNote: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  } else {
    response = `Hi ${profile.name}! How can I help you with your fitness goals today?\n\n`;
    response += `I can help with:\n`;
    response += `• Personalized workout plans (beginner to advanced)\n`;
    response += `• Diet plans and nutrition advice\n`;
    response += `• Exercise recommendations by muscle group\n`;
    response += `• Motivation and habit-building tips\n`;
    response += `• Progress tracking guidance\n\n`;
    response += `What would you like to focus on? Your ${profile.goal.toLowerCase()} goal is totally achievable! 💪\n\n`;
    response += `Note: This is general fitness guidance, not medical advice. Please consult a doctor or certified trainer for personalised medical guidance.`;
  }

  return response;
}
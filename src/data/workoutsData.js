export const muscleGroups = [
  "Chest", "Abs", "Obliques", "Shoulders",
  "Biceps", "Triceps", "Lats", "Back", "Legs"
];

export const exercises = [
  // CHEST EXERCISES
  {
    id: "bench_press",
    name: "Barbell Bench Press",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/barbell_bench_press.png",
    videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
    steps: [
      "Lie flat on a bench with feet on the floor.",
      "Grip the bar slightly wider than shoulder-width.",
      "Lower the bar to mid-chest while keeping elbows at ~45 degrees.",
      "Press the bar back up while squeezing the chest."
    ],
    tips: [
      "Keep your lower back slightly arched.",
      "Do not bounce the bar off your chest.",
      "Keep wrists straight, not bent backwards."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5 reps"
    }
  },
  {
    id: "push_ups",
    name: "Push-ups",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain", "Weight Loss"],
    imageUrl: "/images/workouts/push_ups.png",
    videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
    steps: [
      "Start in a plank position with hands slightly wider than shoulders.",
      "Lower your body until your chest nearly touches the floor.",
      "Push yourself back up to the starting position.",
      "Keep your core tight and body in a straight line."
    ],
    tips: [
      "Keep your elbows at 45 degrees to your body.",
      "Don't let your hips sag or pike up.",
      "Start on your knees if full push-ups are too difficult."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "5 sets x 8–10 reps"
    }
  },
  {
    id: "incline_dumbbell_press",
    name: "Incline Dumbbell Press",
    primaryMuscle: "Chest",
    subRegion: "Upper Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/incline_dumbbell_press.png",
    videoUrl: "https://www.youtube.com/embed/8iPEnn-ltC8",
    steps: [
      "Lie on an incline bench (30-45 degrees) holding dumbbells.",
      "Start with arms extended above your chest.",
      "Lower the weights to the sides of your chest.",
      "Press the weights back up to the starting position."
    ],
    tips: [
      "Keep your feet flat on the floor.",
      "Don't let the weights touch at the top.",
      "Focus on using your chest muscles, not your shoulders."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "decline_bench_press",
    name: "Decline Bench Press",
    primaryMuscle: "Chest",
    subRegion: "Lower Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/decline_bench_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on a decline bench set at 15–30 degrees.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower the bar to the lower chest.",
      "Press the bar back up while squeezing the chest."
    ],
    tips: [
      "Keep your feet secured under the pads.",
      "Focus on the lower chest contraction.",
      "Maintain proper form throughout."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5 reps"
    }
  },
  {
    id: "chest_fly_machine",
    name: "Chest Fly Machine",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Beginner",
    equipment: "Machine",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/chest_fly_machine.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Sit in the chest fly machine with back against pad.",
      "Grab the handles with arms at 90 degrees.",
      "Bring the handles together in front of your chest.",
      "Slowly return to the starting position."
    ],
    tips: [
      "Keep your back against the pad.",
      "Focus on squeezing your chest.",
      "Control the weight on the return."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },

  // ABS EXERCISES
  {
    id: "crunches",
    name: "Crunches",
    primaryMuscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/crunches.png",
    videoUrl: "https://www.youtube.com/embed/Xyd_fa5zoEU",
    steps: [
      "Lie on your back with knees bent and feet flat on the floor.",
      "Place hands behind your head or across your chest.",
      "Lift your shoulders off the ground towards your knees.",
      "Lower back down with control."
    ],
    tips: [
      "Don't pull on your neck with your hands.",
      "Exhale as you crunch up, inhale as you lower.",
      "Focus on using your abs, not momentum."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 15–20 reps",
      weightLoss: "4 sets x 20–25 reps",
      strength: "4 sets x 12–15 reps"
    }
  },
  {
    id: "planks",
    name: "Planks",
    primaryMuscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/planks.png",
    videoUrl: "https://www.youtube.com/embed/ASdvN_XEl_c",
    steps: [
      "Start in a forearm plank position.",
      "Keep your body in a straight line from head to heels.",
      "Engage your core and hold the position.",
      "Breathe normally throughout the hold."
    ],
    tips: [
      "Don't let your hips sag or pike up.",
      "Keep your shoulders directly over your elbows.",
      "Look down at the floor to keep your neck neutral."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 30–45 seconds",
      weightLoss: "4 sets x 45–60 seconds",
      strength: "4 sets x 60–90 seconds"
    }
  },
  {
    id: "leg_raises_hanging",
    name: "Hanging Leg Raises",
    primaryMuscle: "Abs",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/hanging_leg_raises.png",
    videoUrl: "https://www.youtube.com/embed/Pr1Z3nJnFTs",
    steps: [
      "Hang from a pull-up bar with arms fully extended.",
      "Raise your legs up towards your chest.",
      "Lower them back down with control.",
      "Keep your core engaged throughout."
    ],
    tips: [
      "Don't swing your body for momentum.",
      "Keep your legs straight if possible.",
      "Exhale as you raise, inhale as you lower."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 8–12 reps",
      weightLoss: "4 sets x 12–15 reps",
      strength: "4 sets x 6–10 reps"
    }
  },
  {
    id: "cable_crunches",
    name: "Cable Crunches",
    primaryMuscle: "Abs",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/cable_crunches.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Kneel facing cable machine.",
      "Grab rope attachment overhead.",
      "Crunch down bringing elbows to knees.",
      "Slowly return to start."
    ],
    tips: [
      "Keep hips stable.",
      "Focus on abs crunching.",
      "Control the weight."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 12–15 reps",
      weightLoss: "4 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },

  // OBLIQUES EXERCISES
  {
    id: "russian_twists",
    name: "Russian Twists",
    primaryMuscle: "Obliques",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/russian_twists.png",
    videoUrl: "https://www.youtube.com/embed/wkD8rjkodUI",
    steps: [
      "Sit on the floor with knees bent and feet lifted slightly.",
      "Lean back slightly while keeping your back straight.",
      "Twist your torso to one side, then to the other.",
      "Keep your core engaged throughout."
    ],
    tips: [
      "Keep your feet off the ground for more difficulty.",
      "Move slowly and with control.",
      "Don't use momentum to swing your body."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 15–20 reps per side",
      weightLoss: "4 sets x 20–25 reps per side",
      strength: "4 sets x 12–15 reps per side"
    }
  },
  {
    id: "side_plank",
    name: "Side Plank",
    primaryMuscle: "Obliques",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/side_plank.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on your side with forearm on ground.",
      "Stack feet and lift hips off ground.",
      "Hold body in straight line.",
      "Keep core engaged."
    ],
    tips: [
      "Keep hips up and body straight.",
      "Don't let hips sag.",
      "Breathe normally."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 20–30 seconds per side",
      weightLoss: "4 sets x 30–45 seconds per side",
      strength: "4 sets x 45–60 seconds per side"
    }
  },
  {
    id: "bicycle_crunch",
    name: "Bicycle Crunch",
    primaryMuscle: "Obliques",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/bicycle_crunch.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with hands behind head.",
      "Bring opposite elbow to knee.",
      "Alternate sides in pedaling motion.",
      "Keep lower back pressed down."
    ],
    tips: [
      "Don't pull on neck.",
      "Move slowly and controlled.",
      "Exhale on each twist."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 15–20 reps per side",
      weightLoss: "4 sets x 20–25 reps per side",
      strength: "4 sets x 12–15 reps per side"
    }
  },

  // SHOULDERS EXERCISES
  {
    id: "shoulder_press_dumbbell",
    name: "Dumbbell Shoulder Press",
    primaryMuscle: "Shoulders",
    subRegion: "Front Delts",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/dumbbell_shoulder_press.png",
    videoUrl: "https://www.youtube.com/embed/qEwKCR5JCog",
    steps: [
      "Sit or stand holding dumbbells at shoulder height.",
      "Press the weights overhead until arms are fully extended.",
      "Lower the weights back to shoulder height with control.",
      "Keep your core tight throughout."
    ],
    tips: [
      "Don't arch your back excessively.",
      "Keep your wrists straight.",
      "Exhale as you press up, inhale as you lower."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "lateral_raises",
    name: "Lateral Raises",
    primaryMuscle: "Shoulders",
    subRegion: "Side Delts",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/lateral_raises.png",
    videoUrl: "https://www.youtube.com/embed/3VcKaXpzqRo",
    steps: [
      "Stand holding light dumbbells at your sides.",
      "Raise your arms out to the sides until they're parallel to the floor.",
      "Lower the weights back down with control.",
      "Keep a slight bend in your elbows."
    ],
    tips: [
      "Don't swing the weights or use momentum.",
      "Keep your shoulders down and back.",
      "Focus on using your side delts."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },
  {
    id: "rear_delt_fly",
    name: "Rear Delt Fly",
    primaryMuscle: "Shoulders",
    subRegion: "Rear Delts",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/rear_delt_fly.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Bend forward at hips holding dumbbells.",
      "Raise arms out to sides, squeezing rear delts.",
      "Lower with control.",
      "Keep back straight."
    ],
    tips: [
      "Keep elbows slightly bent.",
      "Focus on rear shoulder contraction.",
      "Don't swing weights."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },

  // BICEPS EXERCISES
  {
    id: "bicep_curls_dumbbell",
    name: "Dumbbell Bicep Curls",
    primaryMuscle: "Biceps",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/dumbbell_bicep_curls.png",
    videoUrl: "https://www.youtube.com/embed/ykJmrZ5v0Oo",
    steps: [
      "Stand holding dumbbells with arms at your sides.",
      "Curl the weights up towards your shoulders.",
      "Squeeze your biceps at the top.",
      "Lower the weights back down with control."
    ],
    tips: [
      "Keep your elbows close to your body.",
      "Don't swing your body for momentum.",
      "Control the weight on the way down."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 6–8 reps"
    }
  },
  {
    id: "barbell_curl",
    name: "Barbell Curl",
    primaryMuscle: "Biceps",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/barbell_curl.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Stand holding barbell with shoulder-width grip.",
      "Curl bar up to shoulders.",
      "Squeeze biceps at top.",
      "Lower with control."
    ],
    tips: [
      "Keep elbows stationary.",
      "Don't swing body.",
      "Full range of motion."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 6–8 reps"
    }
  },
  {
    id: "hammer_curl",
    name: "Hammer Curl",
    primaryMuscle: "Biceps",
    difficulty: "Beginner",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/hammer_curl.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Hold dumbbells with neutral grip.",
      "Curl weights up keeping palms facing in.",
      "Squeeze at top.",
      "Lower with control."
    ],
    tips: [
      "Keep wrists straight.",
      "Control the movement.",
      "Don't swing elbows."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },

  // TRICEPS EXERCISES
  {
    id: "tricep_dips",
    name: "Tricep Dips",
    primaryMuscle: "Triceps",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/tricep_dips.png",
    videoUrl: "https://www.youtube.com/embed/6kALZikXxLc",
    steps: [
      "Sit on the edge of a bench or chair.",
      "Place hands next to your hips, fingers forward.",
      "Slide off the bench and lower your body by bending elbows.",
      "Push back up to the starting position."
    ],
    tips: [
      "Keep your shoulders down and back.",
      "Don't let your elbows flare out too much.",
      "Keep your body close to the bench."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 6–10 reps"
    }
  },
  {
    id: "overhead_tricep_extension",
    name: "Overhead Tricep Extension",
    primaryMuscle: "Triceps",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/overhead_tricep_extension.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Hold dumbbell overhead with both hands.",
      "Lower weight behind head by bending elbows.",
      "Extend arms back up.",
      "Keep elbows close to head."
    ],
    tips: [
      "Don't flare elbows.",
      "Keep core tight.",
      "Control the movement."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "cable_pushdown",
    name: "Cable Pushdown",
    primaryMuscle: "Triceps",
    difficulty: "Beginner",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/cable_pushdown.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Stand facing cable machine.",
      "Grab straight bar attachment.",
      "Push bar down until arms extended.",
      "Return to start position."
    ],
    tips: [
      "Keep elbows at sides.",
      "Don't swing body.",
      "Full extension."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },

  // LATS EXERCISES
  {
    id: "lat_pulldown_wide",
    name: "Lat Pulldown (Wide Grip)",
    primaryMuscle: "Lats",
    difficulty: "Intermediate",
    equipment: "Machine",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/lat_pulldown_wide.png",
    videoUrl: "https://www.youtube.com/embed/CAwf7n6Luuc",
    steps: [
      "Sit at the lat pulldown machine with knees secured.",
      "Grip the bar with hands wider than shoulder-width.",
      "Pull the bar down to your upper chest.",
      "Slowly return the bar to the starting position."
    ],
    tips: [
      "Lean back slightly at the start.",
      "Focus on using your back muscles, not your arms.",
      "Don't swing your body to pull the weight down."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "pull_ups",
    name: "Pull-ups",
    primaryMuscle: "Lats",
    difficulty: "Advanced",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/pull_ups.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Hang from pull-up bar with overhand grip.",
      "Pull body up until chin over bar.",
      "Lower with control.",
      "Keep core engaged."
    ],
    tips: [
      "Don't swing or kip.",
      "Full range of motion.",
      "Control descent."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 6–10 reps",
      weightLoss: "3 sets x 8–12 reps",
      strength: "5 sets x 3–5 reps"
    }
  },

  // BACK EXERCISES
  {
    id: "deadlift",
    name: "Conventional Deadlift",
    primaryMuscle: "Back",
    subRegion: "Lower Back",
    difficulty: "Advanced",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/conventional_deadlift.png",
    videoUrl: "https://www.youtube.com/embed/op9kVnSso6Q",
    steps: [
      "Stand with feet hip-width apart, bar over mid-foot.",
      "Bend at hips and knees to grip the bar.",
      "Keep your back straight and chest up.",
      "Drive through your heels to stand up with the bar."
    ],
    tips: [
      "Keep the bar close to your body.",
      "Don't round your back at any point.",
      "Engage your lats before lifting."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 6–10 reps",
      weightLoss: "3 sets x 8–12 reps",
      strength: "5 sets x 3–5 reps"
    }
  },
  {
    id: "seated_cable_row",
    name: "Seated Cable Row",
    primaryMuscle: "Back",
    subRegion: "Upper Back",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/seated_cable_row.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Sit at cable row machine with feet braced.",
      "Grab handle with neutral grip.",
      "Pull handle to lower chest.",
      "Slowly return to start."
    ],
    tips: [
      "Keep back straight.",
      "Squeeze shoulder blades.",
      "Don't lean back excessively."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "barbell_row",
    name: "Barbell Row",
    primaryMuscle: "Back",
    subRegion: "Upper Back",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/barbell_row.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Stand with feet shoulder-width, knees bent.",
      "Hinge at hips, grab barbell.",
      "Pull bar to lower chest.",
      "Lower with control."
    ],
    tips: [
      "Keep back straight.",
      "Pull with back muscles.",
      "Don't swing body."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 6–8 reps"
    }
  },

  // LEGS EXERCISES
  {
    id: "squats",
    name: "Barbell Squats",
    primaryMuscle: "Legs",
    subRegion: "Quadriceps",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/barbell_squats.png",
    videoUrl: "https://www.youtube.com/embed/Dy28eq2PjcM",
    steps: [
      "Stand with feet shoulder-width apart, bar on upper back.",
      "Lower your body by bending at hips and knees.",
      "Keep your chest up and back straight.",
      "Drive through your heels to return to standing."
    ],
    tips: [
      "Keep your knees tracking over your toes.",
      "Don't let your knees cave inward.",
      "Go as low as your mobility allows."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "lunges",
    name: "Walking Lunges",
    primaryMuscle: "Legs",
    subRegion: "Quadriceps",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain", "Weight Loss"],
    imageUrl: "/images/workouts/walking_lunges.png",
    videoUrl: "https://www.youtube.com/embed/L8fvypPrzzs",
    steps: [
      "Stand with feet together, hands on hips.",
      "Step forward with one leg into a lunge position.",
      "Lower until both knees are bent at 90 degrees.",
      "Push off the front foot to bring the back foot forward."
    ],
    tips: [
      "Keep your front knee over your ankle.",
      "Don't let your back knee touch the ground.",
      "Keep your torso upright."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 10–12 reps per leg",
      weightLoss: "4 sets x 12–15 reps per leg",
      strength: "4 sets x 8–10 reps per leg"
    }
  },
  {
    id: "leg_press",
    name: "Leg Press",
    primaryMuscle: "Legs",
    subRegion: "Quadriceps",
    difficulty: "Beginner",
    equipment: "Machine",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/leg_press.png",
    videoUrl: "https://www.youtube.com/embed/IZxyjW7MPJQ",
    steps: [
      "Sit in the leg press machine with feet shoulder-width on platform.",
      "Release the safety locks.",
      "Lower the weight by bending your knees.",
      "Push the platform away by extending your legs."
    ],
    tips: [
      "Don't lock out your knees at the top.",
      "Keep your lower back pressed against the pad.",
      "Control the weight on the way down."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 8–12 reps"
    }
  },
  {
    id: "romanian_deadlift",
    name: "Romanian Deadlift",
    primaryMuscle: "Legs",
    subRegion: "Hamstrings",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/romanian_deadlift.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Stand holding barbell with shoulder-width grip.",
      "Hinge at hips, keep knees slightly bent.",
      "Lower bar while keeping back straight.",
      "Return to start by driving hips forward."
    ],
    tips: [
      "Keep bar close to body.",
      "Slight knee bend only.",
      "Feel stretch in hamstrings."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 6–8 reps"
    }
  },
  {
    id: "standing_calf_raise",
    name: "Standing Calf Raise",
    primaryMuscle: "Legs",
    subRegion: "Calves",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/standing_calf_raise.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Stand with balls of feet on edge of step.",
      "Heels hanging off edge.",
      "Raise up onto toes.",
      "Lower with control."
    ],
    tips: [
      "Full range of motion.",
      "Keep core engaged.",
      "Don't bounce."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 15–20 reps",
      weightLoss: "3 sets x 20–25 reps",
      strength: "4 sets x 12–15 reps"
    }
  }
];
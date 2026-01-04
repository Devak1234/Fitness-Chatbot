export const muscleGroups = [
  "Chest", "Abs", "Obliques", "Shoulders",
  "Biceps", "Triceps", "Lats", "Back", "Legs"
];

export const exercises = [
  // CHEST EXERCISES - Upper Chest
  {
    id: "incline_bench_press_barbell",
    name: "Incline Bench Press (Barbell)",
    primaryMuscle: "Chest",
    subRegion: "Upper Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/incline_bench_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on an incline bench set at 30–45 degrees.",
      "Grip the bar slightly wider than shoulder width.",
      "Lower the bar slowly to the upper chest.",
      "Press the bar back up while squeezing the chest."
    ],
    tips: [
      "Keep your feet planted on the floor.",
      "Do not bounce the bar off your chest.",
      "Maintain a slight arch in your lower back."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps (lighter weight, shorter rest)",
      strength: "5 sets x 5 reps (heavier weight, longer rest)"
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on an incline bench holding dumbbells.",
      "Start with arms extended above your chest.",
      "Lower the weights to the sides of your upper chest.",
      "Press the weights back up to the starting position."
    ],
    tips: [
      "Keep your feet flat on the floor.",
      "Don't let the weights touch at the top.",
      "Focus on using your upper chest muscles."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "incline_chest_fly",
    name: "Incline Chest Fly",
    primaryMuscle: "Chest",
    subRegion: "Upper Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/incline_chest_fly.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on an incline bench holding dumbbells.",
      "Start with arms extended above your chest.",
      "Lower the weights in an arc motion to the sides.",
      "Bring the weights back up in the same arc."
    ],
    tips: [
      "Keep a slight bend in your elbows.",
      "Focus on the stretch and squeeze.",
      "Don't let the weights touch at the top."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "incline_cable_fly",
    name: "Incline Cable Fly",
    primaryMuscle: "Chest",
    subRegion: "Upper Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/incline_cable_fly.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Set cables at the lowest position, lie on incline bench.",
      "Grab the handles with arms extended.",
      "Bring the handles together in an arc motion.",
      "Slowly return to the starting position."
    ],
    tips: [
      "Keep your chest up throughout.",
      "Focus on the mind-muscle connection.",
      "Control the weight on the way back."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "low_to_high_cable_fly",
    name: "Low-to-High Cable Fly",
    primaryMuscle: "Chest",
    subRegion: "Upper Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/low_to_high_cable_fly.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Set cables at the lowest position.",
      "Stand in the center facing away from the machine.",
      "Bring the handles up and together in an arc.",
      "Slowly lower back to the starting position."
    ],
    tips: [
      "Keep your core tight.",
      "Focus on the upper chest contraction.",
      "Use light weight for control."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },
  {
    id: "incline_machine_chest_press",
    name: "Incline Machine Chest Press",
    primaryMuscle: "Chest",
    subRegion: "Upper Chest",
    difficulty: "Beginner",
    equipment: "Machine",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/incline_machine_chest_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Sit in the incline chest press machine.",
      "Grab the handles with palms facing forward.",
      "Press the handles forward until arms are extended.",
      "Slowly bring the handles back to the starting position."
    ],
    tips: [
      "Adjust the seat so handles are at chest level.",
      "Keep your back against the pad.",
      "Control the weight throughout the movement."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },

  // CHEST EXERCISES - Middle Chest
  {
    id: "flat_bench_press_barbell",
    name: "Flat Bench Press (Barbell)",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/flat_bench_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie flat on a bench with feet on the floor.",
      "Grip the bar slightly wider than shoulder-width.",
      "Lower the bar to mid-chest while keeping elbows at ~45 degrees.",
      "Press the bar back up while squeezing the chest."
    ],
    tips: [
      "Keep your lower back slightly arched.",
      "Do not bounce the bar off your chest.",
      "Keep wrists straight."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5 reps"
    }
  },
  {
    id: "flat_dumbbell_press",
    name: "Flat Dumbbell Press",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/flat_dumbbell_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie flat on a bench holding dumbbells.",
      "Start with arms extended above your chest.",
      "Lower the weights to the sides of your chest.",
      "Press the weights back up to the starting position."
    ],
    tips: [
      "Keep your feet flat on the floor.",
      "Don't let the weights touch at the top.",
      "Focus on using your chest muscles."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Start in a plank position with hands slightly wider than shoulders.",
      "Lower your body until your chest nearly touches the floor.",
      "Push yourself back up to the starting position.",
      "Keep your core tight and body in a straight line."
    ],
    tips: [
      "Keep your elbows at 45 degrees to your body.",
      "Don't let your hips sag or pike up.",
      "Start on your knees if needed."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "5 sets x 8–10 reps"
    }
  },
  {
    id: "chest_fly_flat",
    name: "Chest Fly (Flat)",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/chest_fly_flat.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie flat on a bench holding dumbbells.",
      "Start with arms extended above your chest.",
      "Lower the weights in an arc motion to the sides.",
      "Bring the weights back up in the same arc."
    ],
    tips: [
      "Keep a slight bend in your elbows.",
      "Focus on the stretch and squeeze.",
      "Don't let the weights touch at the top."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "cable_fly_mid_level",
    name: "Cable Fly (Mid-Level)",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/cable_fly_mid.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Set cables at chest height.",
      "Stand in the center with handles in hand.",
      "Bring the handles together in front of your chest.",
      "Slowly return to the starting position."
    ],
    tips: [
      "Keep your chest up.",
      "Focus on the mind-muscle connection.",
      "Control the weight throughout."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "pec_deck_machine",
    name: "Pec Deck Machine",
    primaryMuscle: "Chest",
    subRegion: "Middle Chest",
    difficulty: "Beginner",
    equipment: "Machine",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/pec_deck.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Sit in the pec deck machine with back against pad.",
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

  // CHEST EXERCISES - Lower Chest
  {
    id: "decline_barbell_bench_press",
    name: "Decline Barbell Bench Press",
    primaryMuscle: "Chest",
    subRegion: "Lower Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/decline_barbell_press.png",
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
    id: "decline_dumbbell_press",
    name: "Decline Dumbbell Press",
    primaryMuscle: "Chest",
    subRegion: "Lower Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/decline_dumbbell_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on a decline bench holding dumbbells.",
      "Start with arms extended above your chest.",
      "Lower the weights to the sides of your lower chest.",
      "Press the weights back up to the starting position."
    ],
    tips: [
      "Keep your feet secured.",
      "Focus on the lower chest.",
      "Control the weight throughout."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "high_to_low_cable_fly",
    name: "High-to-Low Cable Fly",
    primaryMuscle: "Chest",
    subRegion: "Lower Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/high_to_low_cable_fly.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Set cables at the highest position.",
      "Stand in the center facing the machine.",
      "Bring the handles down and together in an arc.",
      "Slowly return to the starting position."
    ],
    tips: [
      "Keep your core tight.",
      "Focus on the lower chest.",
      "Use controlled movements."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },
  {
    id: "chest_dips",
    name: "Chest Dips (Forward Lean)",
    primaryMuscle: "Chest",
    subRegion: "Lower Chest",
    difficulty: "Advanced",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/chest_dips.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Grab the parallel bars with arms extended.",
      "Lean forward slightly to emphasize chest.",
      "Lower your body by bending your elbows.",
      "Push back up to the starting position."
    ],
    tips: [
      "Keep your elbows close to your body.",
      "Lean forward to target lower chest.",
      "Use assistance if needed."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 6–10 reps"
    }
  },
  {
    id: "decline_machine_press",
    name: "Decline Machine Press",
    primaryMuscle: "Chest",
    subRegion: "Lower Chest",
    difficulty: "Beginner",
    equipment: "Machine",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/decline_machine_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Sit in the decline chest press machine.",
      "Grab the handles with palms facing forward.",
      "Press the handles forward until arms are extended.",
      "Slowly bring the handles back."
    ],
    tips: [
      "Adjust the seat for proper alignment.",
      "Focus on the lower chest.",
      "Control the weight throughout."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },

  // CHEST EXERCISES - Outer Chest
  {
    id: "wide_grip_bench_press",
    name: "Wide Grip Bench Press",
    primaryMuscle: "Chest",
    subRegion: "Outer Chest",
    difficulty: "Intermediate",
    equipment: "Barbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/wide_grip_bench_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie flat on a bench with feet on the floor.",
      "Grip the bar much wider than shoulder-width.",
      "Lower the bar to mid-chest.",
      "Press the bar back up."
    ],
    tips: [
      "Keep elbows flared out.",
      "Focus on outer chest activation.",
      "Use lighter weight than normal bench press."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5 reps"
    }
  },
  {
    id: "wide_pushups",
    name: "Wide Pushups",
    primaryMuscle: "Chest",
    subRegion: "Outer Chest",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Muscle Gain", "Weight Loss"],
    imageUrl: "/images/workouts/wide_pushups.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Start in a plank with hands much wider than shoulders.",
      "Lower your body until chest nearly touches floor.",
      "Push back up to starting position.",
      "Keep core tight and body straight."
    ],
    tips: [
      "Keep elbows flared out.",
      "Focus on outer chest stretch.",
      "Easier than regular push-ups."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 10–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "5 sets x 8–12 reps"
    }
  },
  {
    id: "wide_cable_fly",
    name: "Wide Cable Fly",
    primaryMuscle: "Chest",
    subRegion: "Outer Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/wide_cable_fly.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Set cables at chest height, wide stance.",
      "Grab handles and step forward.",
      "Bring handles together in front of chest.",
      "Slowly return to starting position."
    ],
    tips: [
      "Keep elbows slightly bent.",
      "Focus on outer chest.",
      "Control the movement."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },

  // CHEST EXERCISES - Inner Chest
  {
    id: "cable_crossover",
    name: "Cable Crossover (Inside Squeeze)",
    primaryMuscle: "Chest",
    subRegion: "Inner Chest",
    difficulty: "Intermediate",
    equipment: "Cable",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/cable_crossover.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Set cables at highest position.",
      "Stand in center with handles in hand.",
      "Bring handles down and across body.",
      "Squeeze inner chest at the bottom."
    ],
    tips: [
      "Cross hands over at the bottom.",
      "Focus on inner chest squeeze.",
      "Keep slight bend in elbows."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 12–15 reps",
      weightLoss: "3 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },
  {
    id: "close_grip_dumbbell_press",
    name: "Close Grip Dumbbell Press",
    primaryMuscle: "Chest",
    subRegion: "Inner Chest",
    difficulty: "Intermediate",
    equipment: "Dumbbell",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/close_grip_dumbbell_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie flat on bench holding dumbbells close together.",
      "Start with arms extended above chest.",
      "Lower weights to sides of inner chest.",
      "Press back up squeezing inner chest."
    ],
    tips: [
      "Keep dumbbells close together.",
      "Focus on inner chest activation.",
      "Control the weight throughout."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 8–12 reps",
      weightLoss: "3 sets x 12–15 reps",
      strength: "5 sets x 5–8 reps"
    }
  },
  {
    id: "svend_press",
    name: "Svend Press",
    primaryMuscle: "Chest",
    subRegion: "Inner Chest",
    difficulty: "Advanced",
    equipment: "Plate",
    goalTags: ["Strength", "Muscle Gain"],
    imageUrl: "/images/workouts/svend_press.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Hold a weight plate at chest height.",
      "Press the plate forward by squeezing chest.",
      "Focus on inner chest contraction.",
      "Slowly return to starting position."
    ],
    tips: [
      "Use light weight.",
      "Really focus on the squeeze.",
      "Keep shoulders back."
    ],
    recommendedSetsReps: {
      weightGain: "4 sets x 15–20 reps",
      weightLoss: "3 sets x 20–25 reps",
      strength: "4 sets x 12–15 reps"
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with knees bent, feet flat.",
      "Place hands behind head or across chest.",
      "Lift shoulders towards knees.",
      "Lower with control."
    ],
    tips: [
      "Don't pull on neck.",
      "Exhale on the way up.",
      "Focus on abs, not momentum."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 15–20 reps",
      weightLoss: "4 sets x 20–25 reps",
      strength: "4 sets x 12–15 reps"
    }
  },
  {
    id: "reverse_crunch",
    name: "Reverse Crunch",
    primaryMuscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/reverse_crunch.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with knees bent, hands at sides.",
      "Lift knees towards chest.",
      "Roll hips off ground slightly.",
      "Lower with control."
    ],
    tips: [
      "Keep lower back pressed down.",
      "Use abs to lift, not momentum.",
      "Breathe properly."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 12–15 reps",
      weightLoss: "4 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },
  {
    id: "leg_raises_hanging",
    name: "Leg Raises (Hanging)",
    primaryMuscle: "Abs",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/leg_raises_hanging.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Hang from pull-up bar.",
      "Raise straight legs to parallel with floor.",
      "Lower with control.",
      "Keep core engaged."
    ],
    tips: [
      "Don't swing.",
      "Keep legs straight.",
      "Control the descent."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 8–12 reps",
      weightLoss: "4 sets x 12–15 reps",
      strength: "4 sets x 6–10 reps"
    }
  },
  {
    id: "knee_raises_captain_chair",
    name: "Knee Raises (Captain Chair)",
    primaryMuscle: "Abs",
    difficulty: "Intermediate",
    equipment: "Machine",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/knee_raises_captain_chair.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Stand on captain's chair platform.",
      "Grab handles and lean back slightly.",
      "Raise knees towards chest.",
      "Lower with control."
    ],
    tips: [
      "Keep back straight.",
      "Don't swing.",
      "Focus on abs."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 10–12 reps",
      weightLoss: "4 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "sit_ups",
    name: "Sit-Ups",
    primaryMuscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/sit_ups.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with knees bent.",
      "Place hands behind head.",
      "Sit up until chest touches knees.",
      "Lower with control."
    ],
    tips: [
      "Keep feet on ground.",
      "Don't pull on neck.",
      "Use abs, not hip flexors."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 12–15 reps",
      weightLoss: "4 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
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
  {
    id: "v_ups",
    name: "V-Ups",
    primaryMuscle: "Abs",
    difficulty: "Intermediate",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/v_ups.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with arms overhead.",
      "Simultaneously lift legs and upper body.",
      "Reach hands towards feet.",
      "Form a V shape, then lower."
    ],
    tips: [
      "Keep lower back pressed down.",
      "Don't swing.",
      "Exhale at the top."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 8–10 reps",
      weightLoss: "4 sets x 10–12 reps",
      strength: "4 sets x 6–8 reps"
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Start in forearm plank position.",
      "Keep body straight from head to heels.",
      "Engage core and hold.",
      "Breathe normally."
    ],
    tips: [
      "Don't let hips sag.",
      "Keep shoulders over elbows.",
      "Look at floor."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 30–45 seconds",
      weightLoss: "4 sets x 45–60 seconds",
      strength: "4 sets x 60–90 seconds"
    }
  },
  {
    id: "decline_sit_ups",
    name: "Decline Sit-Ups",
    primaryMuscle: "Abs",
    difficulty: "Intermediate",
    equipment: "Bench",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/decline_sit_ups.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on decline bench, feet secured.",
      "Place hands behind head.",
      "Sit up against gravity.",
      "Lower with control."
    ],
    tips: [
      "Keep feet secured.",
      "Don't pull on neck.",
      "Use abs throughout."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 10–12 reps",
      weightLoss: "4 sets x 12–15 reps",
      strength: "4 sets x 8–10 reps"
    }
  },
  {
    id: "toe_touches",
    name: "Toe Touches",
    primaryMuscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/toe_touches.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with legs straight up.",
      "Reach hands towards toes.",
      "Lift shoulders off ground.",
      "Lower with control."
    ],
    tips: [
      "Keep legs straight.",
      "Don't strain neck.",
      "Focus on upper abs."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 12–15 reps",
      weightLoss: "4 sets x 15–20 reps",
      strength: "4 sets x 10–12 reps"
    }
  },
  {
    id: "flutter_kicks",
    name: "Flutter Kicks",
    primaryMuscle: "Abs",
    difficulty: "Beginner",
    equipment: "Bodyweight",
    goalTags: ["Strength", "Weight Loss"],
    imageUrl: "/images/workouts/flutter_kicks.png",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
    steps: [
      "Lie on back with legs straight.",
      "Lift legs slightly off ground.",
      "Alternate kicking legs up and down.",
      "Keep core engaged."
    ],
    tips: [
      "Keep lower back pressed down.",
      "Move in small, controlled motions.",
      "Breathe steadily."
    ],
    recommendedSetsReps: {
      weightGain: "3 sets x 20–30 seconds",
      weightLoss: "4 sets x 30–45 seconds",
      strength: "4 sets x 15–20 seconds"
    }
  }
];
export const USER_PROFILES = {
  alex: {
    id: 'alex',
    name: 'Alex Rivers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    goal: 'Muscle Building & Strength',
    dietType: 'High Protein / Lean Bulk',
    targetCalories: 2850,
    targetProtein: 190, // grams
    targetCarbs: 320,   // grams
    targetFat: 85,      // grams
    targetWater: 3500,  // ml
    weight: 82.5,       // kg
    targetWeight: 86.0,
    height: 184,        // cm
    bodyFat: 14.2,      // %
    bmr: 1890,
    tdee: 2850,
    streakDays: 14,
  },
  sarah: {
    id: 'sarah',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    goal: 'Fat Loss & Recomposition',
    dietType: 'Balanced / Low Glycemic',
    targetCalories: 1950,
    targetProtein: 145,
    targetCarbs: 180,
    targetFat: 55,
    targetWater: 2800,
    weight: 64.0,
    targetWeight: 59.5,
    height: 168,
    bodyFat: 21.5,
    bmr: 1420,
    tdee: 1950,
    streakDays: 21,
  },
  marcus: {
    id: 'marcus',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    goal: 'Endurance & Keto Maintenance',
    dietType: 'Ketogenic',
    targetCalories: 2400,
    targetProtein: 140,
    targetCarbs: 30,
    targetFat: 185,
    targetWater: 3200,
    weight: 76.0,
    targetWeight: 75.0,
    height: 178,
    bodyFat: 12.8,
    bmr: 1710,
    tdee: 2400,
    streakDays: 9,
  }
};

export const FOOD_DATABASE = [
  {
    id: 'f1',
    name: 'Grilled Chicken Breast',
    category: 'Protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    servingSize: '100g cooked',
    barcode: '890123456701',
    tags: ['High Protein', 'Keto', 'Gluten Free']
  },
  {
    id: 'f2',
    name: 'Wild Atlantic Salmon Fillet',
    category: 'Protein',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 12.3,
    fiber: 0,
    sugar: 0,
    sodium: 61,
    servingSize: '100g cooked',
    barcode: '890123456702',
    tags: ['Omega-3', 'High Protein', 'Keto']
  },
  {
    id: 'f3',
    name: 'Organic Sweet Potato',
    category: 'Carbs',
    calories: 86,
    protein: 1.6,
    carbs: 20.1,
    fat: 0.1,
    fiber: 3.0,
    sugar: 4.2,
    sodium: 55,
    servingSize: '100g baked',
    barcode: '890123456703',
    tags: ['Complex Carbs', 'Vegan', 'Superfood']
  },
  {
    id: 'f4',
    name: 'Tri-Color Quinoa Bowl',
    category: 'Carbs',
    calories: 120,
    protein: 4.4,
    carbs: 21.3,
    fat: 1.9,
    fiber: 2.8,
    sugar: 0.9,
    sodium: 12,
    servingSize: '100g cooked',
    barcode: '890123456704',
    tags: ['Whole Grain', 'Vegan', 'Fiber']
  },
  {
    id: 'f5',
    name: 'Hass Avocado',
    category: 'Healthy Fats',
    calories: 160,
    protein: 2.0,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    sugar: 0.7,
    sodium: 7,
    servingSize: '1/2 medium (100g)',
    barcode: '890123456705',
    tags: ['Healthy Fats', 'Keto', 'High Fiber']
  },
  {
    id: 'f6',
    name: 'Plain Greek Yogurt (0% Fat)',
    category: 'Dairy & Protein',
    calories: 59,
    protein: 10.3,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    sugar: 3.2,
    sodium: 36,
    servingSize: '100g',
    barcode: '890123456706',
    tags: ['Probiotic', 'High Protein', 'Low Fat']
  },
  {
    id: 'f7',
    name: 'Raw Almonds',
    category: 'Snacks & Fats',
    calories: 579,
    protein: 21.2,
    carbs: 21.6,
    fat: 49.9,
    fiber: 12.5,
    sugar: 4.4,
    sodium: 1,
    servingSize: '1 hand (30g)',
    barcode: '890123456707',
    tags: ['Magnesium', 'Keto', 'Vegan']
  },
  {
    id: 'f8',
    name: 'Whey Isolate Protein Powder (Chocolate)',
    category: 'Supplements',
    calories: 120,
    protein: 25.0,
    carbs: 2.0,
    fat: 1.0,
    fiber: 1.0,
    sugar: 0.5,
    sodium: 140,
    servingSize: '1 scoop (32g)',
    barcode: '890123456708',
    tags: ['Fast Absorbing', 'Post-Workout', 'High Protein']
  },
  {
    id: 'f9',
    name: 'Fresh Organic Blueberries',
    category: 'Fruits',
    calories: 57,
    protein: 0.7,
    carbs: 14.5,
    fat: 0.3,
    fiber: 2.4,
    sugar: 9.9,
    sodium: 1,
    servingSize: '1 cup (148g)',
    barcode: '890123456709',
    tags: ['Antioxidant', 'Low Calorie', 'Superfood']
  },
  {
    id: 'f10',
    name: 'Steamed Broccoli Crowns',
    category: 'Veggies',
    calories: 35,
    protein: 2.4,
    carbs: 7.2,
    fat: 0.4,
    fiber: 3.3,
    sugar: 1.4,
    sodium: 33,
    servingSize: '100g steamed',
    barcode: '890123456710',
    tags: ['Micronutrient Rich', 'Low Carb', 'Vegan']
  },
  {
    id: 'f11',
    name: 'Grass-Fed Ribeye Steak',
    category: 'Protein',
    calories: 250,
    protein: 26,
    carbs: 0,
    fat: 16,
    fiber: 0,
    sugar: 0,
    sodium: 54,
    servingSize: '100g cooked',
    barcode: '890123456711',
    tags: ['Creatine Rich', 'Keto', 'High Protein']
  },
  {
    id: 'f12',
    name: 'Organic Rolled Oats',
    category: 'Carbs',
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
    sugar: 1.0,
    sodium: 2,
    servingSize: '1/2 cup dry (50g)',
    barcode: '890123456712',
    tags: ['Beta-Glucan', 'Complex Carbs', 'Heart Healthy']
  }
];

export const SAMPLE_TODAY_MEALS = [
  {
    id: 'm1',
    mealType: 'Breakfast',
    time: '08:15 AM',
    name: 'Avocado Egg & Protein Toast',
    items: [
      { name: 'Whole Wheat Sourdough Toast', qty: '2 slices', calories: 180, protein: 7, carbs: 32, fat: 2 },
      { name: 'Poached Organic Eggs', qty: '2 large', calories: 140, protein: 12, carbs: 1, fat: 10 },
      { name: 'Sliced Hass Avocado', qty: '50g', calories: 80, protein: 1, carbs: 4, fat: 7.5 },
      { name: 'Smoked Salmon Slices', qty: '40g', calories: 80, protein: 10, carbs: 0, fat: 4 }
    ],
    calories: 480,
    protein: 30,
    carbs: 37,
    fat: 23.5,
    verifiedByAI: true
  },
  {
    id: 'm2',
    mealType: 'Lunch',
    time: '01:00 PM',
    name: 'Grilled Chicken & Sweet Potato Power Bowl',
    items: [
      { name: 'Grilled Chicken Breast', qty: '180g', calories: 297, protein: 55, carbs: 0, fat: 6.5 },
      { name: 'Roasted Sweet Potato', qty: '150g', calories: 129, protein: 2.4, carbs: 30.1, fat: 0.2 },
      { name: 'Steamed Broccoli & Kale', qty: '120g', calories: 45, protein: 3, carbs: 9, fat: 0.5 },
      { name: 'Extra Virgin Olive Oil Drizzle', qty: '10ml', calories: 88, protein: 0, carbs: 0, fat: 10 }
    ],
    calories: 559,
    protein: 60.4,
    carbs: 39.1,
    fat: 17.2,
    verifiedByAI: true
  },
  {
    id: 'm3',
    mealType: 'Snack',
    time: '04:30 PM',
    name: 'Whey Isolate Berry Smoothie',
    items: [
      { name: 'Whey Isolate Vanilla', qty: '1.5 scoops', calories: 180, protein: 37.5, carbs: 3, fat: 1.5 },
      { name: 'Unsweetened Almond Milk', qty: '250ml', calories: 35, protein: 1.2, carbs: 1.4, fat: 2.8 },
      { name: 'Frozen Wild Blueberries', qty: '80g', calories: 45, protein: 0.5, carbs: 11.5, fat: 0.2 },
      { name: 'Chia Seeds', qty: '10g', calories: 48, protein: 1.7, carbs: 4.2, fat: 3.1 }
    ],
    calories: 308,
    protein: 40.9,
    carbs: 20.1,
    fat: 7.6,
    verifiedByAI: true
  }
];

export const RECIPES_CATALOG = [
  {
    id: 'r1',
    title: 'High-Protein Salmon Quinoa Power Bowl',
    prepTime: '20 mins',
    cookTime: '15 mins',
    difficulty: 'Easy',
    rating: 4.9,
    reviews: 142,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    tags: ['High Protein', 'Gluten Free', 'Omega-3 Rich'],
    calories: 590,
    protein: 46,
    carbs: 48,
    fat: 22,
    fiber: 8,
    description: 'Crispy skin wild salmon served over warm tri-color quinoa, roasted asparagus, lemon-tahini dressing, and microgreens.',
    ingredients: [
      '180g Wild Atlantic Salmon Fillet',
      '3/4 cup Cooked Tri-Color Quinoa',
      '1 cup Asparagus spears (trimmed)',
      '1/2 Hass Avocado (sliced)',
      '1 tbsp Lemon Tahini Dressing',
      '1 tsp Sesame seeds & Chili Flakes'
    ],
    instructions: [
      'Season salmon fillet with sea salt, black pepper, and garlic powder.',
      'Heat non-stick skillet over medium-high heat. Sear salmon skin-side down for 4 mins, flip and cook 3 mins.',
      'Sauté asparagus in the same pan until tender-crisp (3-4 mins).',
      'Assemble bowl: layer cooked quinoa, topped with seared salmon, asparagus, and avocado slices.',
      'Drizzle with lemon tahini dressing and sprinkle sesame seeds.'
    ],
    aiSubstituteSuggestion: 'Swap quinoa for cauliflower rice to save 35g of carbs (Keto variation).'
  },
  {
    id: 'r2',
    title: 'Anabolic Chicken Breast Fajita Meal Prep',
    prepTime: '15 mins',
    cookTime: '20 mins',
    difficulty: 'Easy',
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    tags: ['Low Fat', 'Meal Prep', 'High Protein'],
    calories: 520,
    protein: 58,
    carbs: 42,
    fat: 11,
    fiber: 9,
    description: 'Flavor-packed seasoned chicken tenderloins with charred bell peppers, caramelized onions, black beans, and cilantro lime rice.',
    ingredients: [
      '200g Lean Chicken Breast',
      '1 Red & 1 Yellow Bell Pepper (sliced)',
      '1/2 Red Onion (sliced)',
      '1/2 cup Black Beans (rinsed)',
      '3/4 cup Basmati Brown Rice',
      'Fajita Spice Mix (Cumin, Paprika, Oregano, Chili)'
    ],
    instructions: [
      'Slice chicken into strips and toss with fajita seasoning and lime juice.',
      'Sear chicken in a cast iron skillet for 6-8 minutes until golden brown.',
      'Toss in sliced peppers and onions, cooking on high heat until slightly charred.',
      'Serve alongside warm brown rice and seasoned black beans.'
    ],
    aiSubstituteSuggestion: 'Replace brown rice with shredded lettuce for a Low-Calorie Fajita Bowl.'
  },
  {
    id: 'r3',
    title: 'Overnight Chia Berry Protein Oats',
    prepTime: '5 mins',
    cookTime: '0 mins (Chill overnight)',
    difficulty: 'Beginner',
    rating: 4.95,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80',
    tags: ['No-Cook', 'Vegetarian', 'High Fiber'],
    calories: 410,
    protein: 34,
    carbs: 49,
    fat: 9,
    fiber: 11,
    description: 'Creamy rolled oats infused with vanilla whey isolate, chia seeds, Greek yogurt, topped with fresh raspberries and toasted almond flakes.',
    ingredients: [
      '1/2 cup Rolled Oats',
      '1 scoop Vanilla Whey/Plant Isolate',
      '1 tbsp Organic Chia Seeds',
      '1/2 cup Unsweetened Almond Milk',
      '2 tbsp Plain Greek Yogurt',
      '1/2 cup Fresh Raspberries & Sliced Almonds'
    ],
    instructions: [
      'In a glass jar, mix oats, protein powder, chia seeds, almond milk, and yogurt.',
      'Stir vigorously until smooth. Cover and refrigerate for at least 4 hours or overnight.',
      'Top with fresh raspberries and almond flakes before serving.'
    ],
    aiSubstituteSuggestion: 'Use Pea Protein Isolate & Soy Milk for a 100% Vegan prep.'
  },
  {
    id: 'r4',
    title: 'Keto Grass-Fed Steak & Creamy Spinach',
    prepTime: '10 mins',
    cookTime: '15 mins',
    difficulty: 'Medium',
    rating: 4.87,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    tags: ['Keto', 'Low Carb', 'High Iron'],
    calories: 680,
    protein: 52,
    carbs: 6,
    fat: 48,
    fiber: 4,
    description: 'Juicy garlic-butter basted ribeye steak paired with rich creamed baby spinach and nutmeg.',
    ingredients: [
      '220g Grass-Fed Ribeye Steak',
      '2 cups Fresh Baby Spinach',
      '2 tbsp Heavy Cream or Cream Cheese',
      '1 tbsp Grass-fed Butter',
      '2 cloves Garlic (minced)'
    ],
    instructions: [
      'Pat steak dry and season generously with coarse kosher salt.',
      'Heat skillet until smoking hot. Sear steak for 3 mins per side, basting with butter and garlic.',
      'Remove steak to rest. In the same pan, wilt baby spinach with heavy cream and grated nutmeg.',
      'Slice steak against the grain and serve alongside creamed spinach.'
    ],
    aiSubstituteSuggestion: 'Substitute heavy cream with coconut cream for a dairy-free keto version.'
  }
];

export const MOCK_SCAN_TEMPLATES = [
  {
    id: 'scan_1',
    title: 'Seared Salmon & Quinoa Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    confidence: '98.4%',
    detectedItems: [
      { name: 'Atlantic Salmon', portion: '175g', calories: 360, protein: 38, carbs: 0, fat: 22 },
      { name: 'Tri-Color Quinoa', portion: '120g', calories: 144, protein: 5, carbs: 26, fat: 2.3 },
      { name: 'Grilled Asparagus', portion: '80g', calories: 20, protein: 2, carbs: 4, fat: 0.2 },
      { name: 'Sliced Avocado', portion: '40g', calories: 64, protein: 0.8, carbs: 3.4, fat: 6 }
    ],
    totalCalories: 588,
    totalProtein: 45.8,
    totalCarbs: 33.4,
    totalFat: 30.5
  },
  {
    id: 'scan_2',
    title: 'Protein Pancake stack with Berries',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80',
    confidence: '96.2%',
    detectedItems: [
      { name: 'Oat Flour Protein Pancakes', portion: '3 cakes (180g)', calories: 340, protein: 28, carbs: 42, fat: 6 },
      { name: 'Fresh Strawberries & Blueberries', portion: '70g', calories: 38, protein: 0.6, carbs: 9, fat: 0.3 },
      { name: 'Zero-Sugar Maple Syrup', portion: '30ml', calories: 15, protein: 0, carbs: 4, fat: 0 }
    ],
    totalCalories: 393,
    totalProtein: 28.6,
    totalCarbs: 55.0,
    totalFat: 6.3
  },
  {
    id: 'scan_3',
    title: 'Mediterranean Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    confidence: '97.8%',
    detectedItems: [
      { name: 'Grilled Herb Chicken', portion: '160g', calories: 264, protein: 49, carbs: 0, fat: 5.7 },
      { name: 'Mixed Baby Greens', portion: '100g', calories: 23, protein: 2.2, carbs: 4.5, fat: 0.4 },
      { name: 'Feta Cheese & Olives', portion: '40g', calories: 110, protein: 5, carbs: 2, fat: 9 },
      { name: 'Extra Virgin Olive Vinaigrette', portion: '15ml', calories: 120, protein: 0, carbs: 1, fat: 13.5 }
    ],
    totalCalories: 517,
    totalProtein: 56.2,
    totalCarbs: 7.5,
    totalFat: 28.6
  }
];

export const WORKOUT_CATALOG = [
  { id: 'w1', name: 'Barbell Hypertrophy (Chest & Triceps)', type: 'Strength', icon: 'Dumbbell', caloriesPerMin: 7.5, defaultDuration: 60, estimatedBurn: 450 },
  { id: 'w2', name: 'HIIT Treadmill Sprints & Plyometrics', type: 'Cardio', icon: 'Flame', caloriesPerMin: 12.0, defaultDuration: 30, estimatedBurn: 360 },
  { id: 'w3', name: 'Outdoor Road Cycling (Moderate Pace)', type: 'Cardio', icon: 'Bike', caloriesPerMin: 9.2, defaultDuration: 45, estimatedBurn: 414 },
  { id: 'w4', name: 'Vinyasa Core Power Yoga', type: 'Flexibility', icon: 'Activity', caloriesPerMin: 4.5, defaultDuration: 45, estimatedBurn: 202 },
  { id: 'w5', name: 'Freestyle Swimming Laps', type: 'Full Body', icon: 'Waves', caloriesPerMin: 10.5, defaultDuration: 40, estimatedBurn: 420 },
  { id: 'w6', name: 'Leg Day (Squats & Deadlifts Focus)', type: 'Strength', icon: 'Zap', caloriesPerMin: 8.8, defaultDuration: 70, estimatedBurn: 616 }
];

export const SAMPLE_TODAY_WORKOUTS = [
  { id: 'tw1', name: 'Barbell Hypertrophy (Chest & Triceps)', duration: 55, caloriesBurned: 412, time: '07:00 AM', status: 'Synced via Apple Health' },
  { id: 'tw2', name: 'Post-Lunch Brisk Walk', duration: 25, caloriesBurned: 135, time: '02:15 PM', status: 'Synced via Garmin Pay' }
];

export const WEIGHT_HISTORY_14_DAYS = [
  { day: 'Jul 29', weight: 83.8, calories: 2790, protein: 182, water: 3200 },
  { day: 'Jul 30', weight: 83.6, calories: 2840, protein: 188, water: 3400 },
  { day: 'Jul 31', weight: 83.5, calories: 2750, protein: 175, water: 3100 },
  { day: 'Aug 01', weight: 83.3, calories: 2900, protein: 195, water: 3600 },
  { day: 'Aug 02', weight: 83.2, calories: 2810, protein: 185, water: 3500 },
  { day: 'Aug 03', weight: 83.1, calories: 2860, protein: 191, water: 3300 },
  { day: 'Aug 04', weight: 83.0, calories: 2780, protein: 180, water: 3400 },
  { day: 'Aug 05', weight: 82.9, calories: 2850, protein: 192, water: 3500 },
  { day: 'Aug 06', weight: 82.8, calories: 2880, protein: 189, water: 3600 },
  { day: 'Aug 07', weight: 82.7, calories: 2820, protein: 186, water: 3400 },
  { day: 'Aug 08', weight: 82.6, calories: 2890, protein: 194, water: 3700 },
  { day: 'Aug 09', weight: 82.6, calories: 2810, protein: 187, water: 3500 },
  { day: 'Aug 10', weight: 82.5, calories: 2850, protein: 190, water: 3500 },
  { day: 'Today', weight: 82.4, calories: 1347, protein: 131, water: 2400 }
];

export const AI_CHAT_PROMPTS = [
  "How can I hit my protein goal today without adding too many fat calories?",
  "What is a great post-workout recovery meal under 500 kcal?",
  "Can you generate a 3-day Keto meal plan for lean muscle gain?",
  "Explain the difference between TDEE and BMR in simple terms.",
  "Suggest healthy substitutes for white rice and mayonnaise."
];

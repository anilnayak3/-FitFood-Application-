import React, { useState } from 'react';
import { LayoutDashboard, Calendar, Dumbbell, BarChart3, ShoppingBag, User, Sparkles, Plus, Droplet } from 'lucide-react';
import confetti from 'canvas-confetti';

import { USER_PROFILES, SAMPLE_TODAY_MEALS, SAMPLE_TODAY_WORKOUTS } from './data/foodDatabase';
import Dashboard from './components/Dashboard';
import MealPlanner from './components/MealPlanner';
import FoodLoggerModal from './components/FoodLoggerModal';
import AIChatAssistant from './components/AIChatAssistant';
import WorkoutTracker from './components/WorkoutTracker';
import Analytics from './components/Analytics';
import GroceryList from './components/GroceryList';
import ProfileSettings from './components/ProfileSettings';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(USER_PROFILES.alex);

  // Core Application State
  const [todayMeals, setTodayMeals] = useState(SAMPLE_TODAY_MEALS);
  const [todayWorkouts, setTodayWorkouts] = useState(SAMPLE_TODAY_WORKOUTS);
  const [waterIntake, setWaterIntake] = useState(2250); // ml

  // Modals & Drawers State
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [loggerInitialTab, setLoggerInitialTab] = useState('search');
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  // Grocery State
  const [groceryItems, setGroceryItems] = useState([
    { id: 'g1', name: '180g Wild Atlantic Salmon Fillets', category: 'Lean Meats & Fish', checked: false },
    { id: 'g2', name: 'Tri-Color Quinoa (1 lb bag)', category: 'Pantry & Spices', checked: true },
    { id: 'g3', name: 'Organic Hass Avocados (4 count)', category: 'Produce', checked: false },
    { id: 'g4', name: 'Plain Greek Yogurt 0% Fat', category: 'Dairy & Eggs', checked: false },
    { id: 'g5', name: 'Whey Protein Isolate Vanilla', category: 'Supplements', checked: true }
  ]);

  // Handlers
  const handleSelectProfile = (profileId) => {
    if (USER_PROFILES[profileId]) {
      setCurrentUser(USER_PROFILES[profileId]);
    }
  };

  const handleUpdateUserTarget = (updatedFields) => {
    setCurrentUser(prev => ({ ...prev, ...updatedFields }));
  };

  const handleAddMeal = (newMeal) => {
    setTodayMeals(prev => [newMeal, ...prev]);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
  };

  const handleDeleteMeal = (mealId) => {
    setTodayMeals(prev => prev.filter(m => m.id !== mealId));
  };

  const handleAddWorkout = (newWorkout) => {
    setTodayWorkouts(prev => [newWorkout, ...prev]);
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.8 } });
  };

  const handleDeleteWorkout = (workoutId) => {
    setTodayWorkouts(prev => prev.filter(w => w.id !== workoutId));
  };

  const handleAddWater = (amount) => {
    const newTotal = waterIntake + amount;
    setWaterIntake(newTotal);
    if (newTotal >= currentUser.targetWater && waterIntake < currentUser.targetWater) {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
    }
  };

  const handleOpenLogger = (tab = 'search') => {
    setLoggerInitialTab(tab);
    setIsLoggerOpen(true);
  };

  const handleLogRecipeToMeal = (recipe) => {
    const mealEntry = {
      id: 'm_recipe_' + Date.now(),
      mealType: 'Dinner',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: recipe.title,
      items: recipe.ingredients.map(ing => ({ name: ing, qty: '1 serving', calories: Math.round(recipe.calories / recipe.ingredients.length), protein: recipe.protein / recipe.ingredients.length, carbs: recipe.carbs / recipe.ingredients.length, fat: recipe.fat / recipe.ingredients.length })),
      calories: recipe.calories,
      protein: recipe.protein,
      carbs: recipe.carbs,
      fat: recipe.fat,
      verifiedByAI: true
    };
    handleAddMeal(mealEntry);
  };

  const handleAddIngredientsToGrocery = (ingredients) => {
    const newItems = ingredients.map((ing, idx) => ({
      id: 'g_ing_' + Date.now() + '_' + idx,
      name: ing,
      category: 'Pantry & Spices',
      checked: false
    }));
    setGroceryItems(prev => [...newItems, ...prev]);
    setActiveTab('grocery');
  };

  const handleToggleGroceryItem = (id) => {
    setGroceryItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleAddGroceryItem = (name, category) => {
    setGroceryItems(prev => [{ id: 'g_' + Date.now(), name, category, checked: false }, ...prev]);
  };

  const handleDeleteGroceryItem = (id) => {
    setGroceryItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <header className="top-navbar">
        <div className="brand-logo" onClick={() => setActiveTab('dashboard')}>
          <div className="brand-icon-wrapper">
            🥗
          </div>
          <div>
            FitFood <span className="text-gradient">AI</span>
          </div>
        </div>

        <nav className="nav-tabs">
          <button className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={17} /> Summary
          </button>
          <button className={`nav-tab-btn ${activeTab === 'planner' ? 'active' : ''}`} onClick={() => setActiveTab('planner')}>
            <Calendar size={17} /> Meal Planner
          </button>
          <button className={`nav-tab-btn ${activeTab === 'workout' ? 'active' : ''}`} onClick={() => setActiveTab('workout')}>
            <Dumbbell size={17} /> Workout Sync
          </button>
          <button className={`nav-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => setActiveTab('analytics')}>
            <BarChart3 size={17} /> Analytics
          </button>
          <button className={`nav-tab-btn ${activeTab === 'grocery' ? 'active' : ''}`} onClick={() => setActiveTab('grocery')}>
            <ShoppingBag size={17} /> Grocery List
          </button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }} onClick={() => setIsAIChatOpen(!isAIChatOpen)}>
            <Sparkles size={16} color="var(--accent-purple)" /> FitFood AI
          </button>

          <div className="user-profile-pill" onClick={() => setActiveTab('profile')}>
            <img src={currentUser.avatar} alt={currentUser.name} className="user-avatar-small" />
            <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{currentUser.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--emerald-400)' }}>{currentUser.targetCalories} kcal</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="main-viewport">
        {activeTab === 'dashboard' && (
          <Dashboard
            user={currentUser}
            todayMeals={todayMeals}
            todayWorkouts={todayWorkouts}
            waterIntake={waterIntake}
            onAddWater={handleAddWater}
            onOpenLogger={handleOpenLogger}
            onDeleteMeal={handleDeleteMeal}
            onOpenAIChat={() => setIsAIChatOpen(true)}
          />
        )}

        {activeTab === 'planner' && (
          <MealPlanner
            onLogRecipeToMeal={handleLogRecipeToMeal}
            onAddIngredientsToGrocery={handleAddIngredientsToGrocery}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutTracker
            todayWorkouts={todayWorkouts}
            onAddWorkout={handleAddWorkout}
            onDeleteWorkout={handleDeleteWorkout}
          />
        )}

        {activeTab === 'analytics' && (
          <Analytics user={currentUser} />
        )}

        {activeTab === 'grocery' && (
          <GroceryList
            groceryItems={groceryItems}
            onToggleItem={handleToggleGroceryItem}
            onAddItem={handleAddGroceryItem}
            onDeleteItem={handleDeleteGroceryItem}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileSettings
            user={currentUser}
            onSelectProfile={handleSelectProfile}
            onUpdateUserTarget={handleUpdateUserTarget}
          />
        )}
      </main>

      {/* Food Logger Modal */}
      {isLoggerOpen && (
        <FoodLoggerModal
          initialTab={loggerInitialTab}
          onClose={() => setIsLoggerOpen(false)}
          onAddMeal={handleAddMeal}
        />
      )}

      {/* Floating AI Chat Assistant Drawer */}
      {isAIChatOpen && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 90, width: '420px', maxWidth: 'calc(100vw - 32px)', boxShadow: 'var(--shadow-lg)' }}>
          <AIChatAssistant
            user={currentUser}
            todayMeals={todayMeals}
            onClose={() => setIsAIChatOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

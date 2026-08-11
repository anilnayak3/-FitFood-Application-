import React from 'react';
import { Flame, Droplet, Plus, Utensils, Award, Sparkles, CheckCircle2, ChevronRight, Zap, RefreshCw } from 'lucide-react';

export default function Dashboard({
  user,
  todayMeals,
  todayWorkouts,
  waterIntake,
  onAddWater,
  onOpenLogger,
  onDeleteMeal,
  onOpenAIChat
}) {
  // Calculations
  const consumedCalories = todayMeals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const consumedProtein = Math.round(todayMeals.reduce((sum, m) => sum + (m.protein || 0), 0));
  const consumedCarbs = Math.round(todayMeals.reduce((sum, m) => sum + (m.carbs || 0), 0));
  const consumedFat = Math.round(todayMeals.reduce((sum, m) => sum + (m.fat || 0), 0));

  const burnedCalories = todayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
  const netCalories = consumedCalories - burnedCalories;
  const remainingCalories = user.targetCalories - netCalories;

  // Calorie Ring SVG Math
  const ringRadius = 75;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const caloriePercent = Math.min(100, Math.max(0, (netCalories / user.targetCalories) * 100));
  const strokeDashoffset = ringCircumference - (caloriePercent / 100) * ringCircumference;

  // Macro percentages
  const proteinPct = Math.min(100, Math.round((consumedProtein / user.targetProtein) * 100));
  const carbsPct = Math.min(100, Math.round((consumedCarbs / user.targetCarbs) * 100));
  const fatPct = Math.min(100, Math.round((consumedFat / user.targetFat) * 100));

  const waterPercent = Math.min(100, Math.round((waterIntake / user.targetWater) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner Context */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--emerald-400)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Day {user.streakDays} Streak 🔥
              </span>
              <span className="tag-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399' }}>
                {user.goal}
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>
              Welcome back, <span className="text-gradient">{user.name}</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              You are currently <strong style={{ color: 'var(--text-main)' }}>{remainingCalories > 0 ? `${remainingCalories} kcal` : '0 kcal'}</strong> away from your daily target.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn-primary" onClick={() => onOpenLogger('search')}>
              <Plus size={18} /> Log Meal
            </button>
            <button className="btn-secondary" onClick={() => onOpenLogger('photo')}>
              <Sparkles size={18} color="var(--emerald-400)" /> AI Food Scan
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid-dashboard">
        {/* Left Column: Calorie Ring & Macro Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Calorie Ring Card */}
          <div className="glass-card">
            <div className="glass-card-header">
              <h3 className="card-title">
                <Flame size={20} color="var(--emerald-400)" /> Daily Energy Balance
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target: {user.targetCalories} kcal</span>
            </div>

            <div className="ring-hero-container">
              {/* Radial Progress Ring */}
              <div className="ring-wrapper">
                <svg width="190" height="190" viewBox="0 0 190 190">
                  {/* Track Circle */}
                  <circle
                    cx="95"
                    cy="95"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.07)"
                    strokeWidth="14"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="95"
                    cy="95"
                    r={ringRadius}
                    fill="none"
                    stroke="url(#emeraldGradient)"
                    strokeWidth="14"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                    transform="rotate(-90 95 95)"
                  />
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="ring-center-content">
                  <div className="ring-number" style={{ color: remainingCalories >= 0 ? 'var(--text-main)' : 'var(--accent-amber)' }}>
                    {remainingCalories >= 0 ? remainingCalories : 0}
                  </div>
                  <div className="ring-label">kcal remaining</div>
                </div>
              </div>

              {/* Energy Stats Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', minWidth: '180px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Eaten</span>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--emerald-400)' }}>
                    {consumedCalories} <small style={{ fontSize: '0.75rem', fontWeight: '400' }}>kcal</small>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Burned</span>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-amber)' }}>
                    {burnedCalories} <small style={{ fontSize: '0.75rem', fontWeight: '400' }}>kcal</small>
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Net Energy</span>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                    {netCalories} <small style={{ fontSize: '0.75rem', fontWeight: '400' }}>kcal</small>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Macro Breakdown Card */}
          <div className="glass-card">
            <div className="glass-card-header">
              <h3 className="card-title">
                <Zap size={20} color="var(--accent-cyan)" /> Macronutrient Breakdown
              </h3>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Daily Target Matrix</span>
            </div>

            <div className="macro-progress-group">
              {/* Protein Bar */}
              <div className="macro-item">
                <div className="macro-header">
                  <span>Protein</span>
                  <span style={{ color: 'var(--emerald-400)' }}>
                    <strong>{consumedProtein}g</strong> / {user.targetProtein}g ({proteinPct}%)
                  </span>
                </div>
                <div className="macro-bar-track">
                  <div className="macro-bar-fill fill-protein" style={{ width: `${proteinPct}%` }} />
                </div>
              </div>

              {/* Carbohydrates Bar */}
              <div className="macro-item">
                <div className="macro-header">
                  <span>Carbohydrates</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>
                    <strong>{consumedCarbs}g</strong> / {user.targetCarbs}g ({carbsPct}%)
                  </span>
                </div>
                <div className="macro-bar-track">
                  <div className="macro-bar-fill fill-carbs" style={{ width: `${carbsPct}%` }} />
                </div>
              </div>

              {/* Fats Bar */}
              <div className="macro-item">
                <div className="macro-header">
                  <span>Healthy Fats</span>
                  <span style={{ color: 'var(--accent-amber)' }}>
                    <strong>{consumedFat}g</strong> / {user.targetFat}g ({fatPct}%)
                  </span>
                </div>
                <div className="macro-bar-track">
                  <div className="macro-bar-fill fill-fat" style={{ width: `${fatPct}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Today's Logged Meals Timeline */}
          <div className="glass-card">
            <div className="glass-card-header">
              <h3 className="card-title">
                <Utensils size={20} color="var(--emerald-400)" /> Today's Meal Timeline
              </h3>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }} onClick={() => onOpenLogger('search')}>
                <Plus size={14} /> Add Item
              </button>
            </div>

            {todayMeals.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                No meals logged today yet. Click "Log Meal" to get started!
              </div>
            ) : (
              <div className="meal-timeline-list">
                {todayMeals.map((meal) => (
                  <div key={meal.id} className="meal-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className={`meal-badge badge-${meal.mealType.toLowerCase()}`}>
                        {meal.mealType}
                      </span>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{meal.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {meal.time} • P: {Math.round(meal.protein)}g | C: {Math.round(meal.carbs)}g | F: {Math.round(meal.fat)}g
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--emerald-400)' }}>
                        {meal.calories} kcal
                      </span>
                      <button
                        className="btn-icon-only"
                        style={{ width: '28px', height: '28px', color: 'var(--accent-rose)' }}
                        onClick={() => onDeleteMeal(meal.id)}
                        title="Delete entry"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Hydration & AI Smart Coach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Water Hydration Card */}
          <div className="glass-card water-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplet size={20} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Water Hydration</h3>
            </div>

            <div className="water-bottle-glass">
              <div className="water-fill" style={{ height: `${waterPercent}%` }}>
                <div className="water-wave" />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>
                {waterIntake} <small style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>/ {user.targetWater} ml</small>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>{waterPercent}% of target completed</div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
              <button
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }}
                onClick={() => onAddWater(250)}
              >
                +250 ml
              </button>
              <button
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center', background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)' }}
                onClick={() => onAddWater(500)}
              >
                +500 ml
              </button>
            </div>
          </div>

          {/* AI Coach Instant Smart Advice Card */}
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)', border: '1px solid rgba(139, 92, 246, 0.25)' }}>
            <div className="glass-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={18} color="var(--accent-purple)" />
                <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>FitFood AI Coach Insight</h3>
              </div>
              <span className="tag-pill" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#C084FC' }}>
                Real-Time
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '1.2rem' }}>
              💡 <strong>Smart Protein Notice:</strong> You are currently at {consumedProtein}g of protein ({proteinPct}% of goal). To reach your target of {user.targetProtein}g without overloading carbs, try a whey isolate shake or 150g plain Greek yogurt with cinnamon for your evening snack!
            </p>

            <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={onOpenAIChat}>
              Ask FitFood AI Assistant <ChevronRight size={16} />
            </button>
          </div>

          {/* Streak & Achievements Badge */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={24} color="var(--accent-amber)" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700' }}>Clean Eater Badge</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logged 3+ balanced meals for 14 consecutive days!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

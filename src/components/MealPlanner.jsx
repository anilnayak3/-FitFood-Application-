import React, { useState } from 'react';
import { Calendar, ChefHat, Sparkles, Clock, Flame, Plus, Check, Search, Filter, ShoppingBag, ArrowRight } from 'lucide-react';
import { RECIPES_CATALOG } from '../data/foodDatabase';

export default function MealPlanner({ onLogRecipeToMeal, onAddIngredientsToGrocery }) {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipeModal, setSelectedRecipeModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const categories = ['All', 'High Protein', 'Keto', 'Gluten Free', 'Meal Prep', 'Vegetarian'];

  const filteredRecipes = RECIPES_CATALOG.filter(recipe => {
    const matchesCategory = selectedCategory === 'All' || recipe.tags.includes(selectedCategory);
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(16, 185, 129, 0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <ChefHat size={20} color="var(--emerald-400)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--emerald-400)', fontWeight: '700', textTransform: 'uppercase' }}>
                AI Weekly Prep & Discovery
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>AI Meal Planner & Recipe Hub</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Tailored recipes calculated specifically for your macro breakdown and dietary goals.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="tag-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399', padding: '0.5rem 0.85rem' }}>
              ✨ Auto Macro Matched
            </span>
          </div>
        </div>
      </div>

      {/* Days Selector Bar */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {daysOfWeek.map(day => (
          <button
            key={day}
            className={`nav-tab-btn ${selectedDay === day ? 'active' : ''}`}
            style={{ padding: '0.6rem 1.25rem' }}
            onClick={() => setSelectedDay(day)}
          >
            <Calendar size={14} /> {day}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`tag-pill ${selectedCategory === cat ? 'active' : ''}`}
              style={{
                padding: '0.45rem 0.9rem',
                fontSize: '0.85rem',
                cursor: 'pointer',
                background: selectedCategory === cat ? 'var(--emerald-600)' : 'rgba(255, 255, 255, 0.05)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-muted)'
              }}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search recipes or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem 0.5rem 2.2rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid-2">
        {filteredRecipes.map(recipe => (
          <div key={recipe.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '0', overflow: 'hidden' }}>
            <div style={{ position: 'relative', height: '180px', width: '100%' }}>
              <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: '700', fontSize: '0.85rem', color: 'var(--emerald-400)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                {recipe.calories} kcal
              </div>
              <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {recipe.tags.map(t => (
                  <span key={t} className="tag-pill" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', color: '#fff' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700' }}>{recipe.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                {recipe.description}
              </p>

              {/* Macros Pill Grid */}
              <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <div><strong>P:</strong> <span style={{ color: 'var(--emerald-400)' }}>{recipe.protein}g</span></div>
                <div><strong>C:</strong> <span style={{ color: 'var(--accent-cyan)' }}>{recipe.carbs}g</span></div>
                <div><strong>F:</strong> <span style={{ color: 'var(--accent-amber)' }}>{recipe.fat}g</span></div>
                <div><strong>Prep:</strong> <span style={{ color: 'var(--text-muted)' }}>{recipe.prepTime}</span></div>
              </div>

              {/* Actions */}
              <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', paddingTop: '0.5rem' }}>
                <button
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '0.5rem' }}
                  onClick={() => setSelectedRecipeModal(recipe)}
                >
                  View Details & Guide
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
                  onClick={() => onLogRecipeToMeal(recipe)}
                  title="Log directly to Today's Meals"
                >
                  <Plus size={16} /> Log Meal
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipeModal && (
        <div className="modal-backdrop" onClick={() => setSelectedRecipeModal(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>{selectedRecipeModal.title}</h3>
              <button className="btn-icon-only" onClick={() => setSelectedRecipeModal(null)}>✕</button>
            </div>

            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <img src={selectedRecipeModal.image} alt={selectedRecipeModal.title} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />

              {/* AI Substitution Banner */}
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald-400)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  <Sparkles size={16} /> FitFood AI Substitute Advice
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  {selectedRecipeModal.aiSubstituteSuggestion}
                </div>
              </div>

              {/* Ingredients List */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Ingredients Needed</h4>
                <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {selectedRecipeModal.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>

              {/* Cooking Instructions */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Step-by-Step Preparation</h4>
                <ol style={{ paddingLeft: '1.25rem', color: 'var(--text-main)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {selectedRecipeModal.instructions.map((inst, idx) => (
                    <li key={idx}>{inst}</li>
                  ))}
                </ol>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => {
                    onLogRecipeToMeal(selectedRecipeModal);
                    setSelectedRecipeModal(null);
                  }}
                >
                  <Plus size={18} /> Log Recipe to Today's Meals
                </button>
                <button
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => {
                    onAddIngredientsToGrocery(selectedRecipeModal.ingredients);
                    setSelectedRecipeModal(null);
                  }}
                >
                  <ShoppingBag size={18} color="var(--accent-cyan)" /> Add Ingredients to Grocery List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

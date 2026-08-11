import React from 'react';
import { User, Target, Sliders, Flame, Check, Scale } from 'lucide-react';
import { USER_PROFILES } from '../data/foodDatabase';

export default function ProfileSettings({ user, onSelectProfile, onUpdateUserTarget }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <User size={20} color="var(--emerald-400)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--emerald-400)', fontWeight: '700', textTransform: 'uppercase' }}>
                Biometrics & Metabolic Engine
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>User Profile & Macro Targets</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Switch demo user personas or adjust your daily calorie and macronutrient targets.
            </p>
          </div>
        </div>
      </div>

      {/* Switch Demo Persona Grid */}
      <div className="glass-card">
        <div className="glass-card-header">
          <h3 className="card-title">
            <Target size={20} color="var(--emerald-400)" /> Select Demo Persona Profile
          </h3>
        </div>

        <div className="grid-3">
          {Object.values(USER_PROFILES).map(p => (
            <div
              key={p.id}
              style={{
                background: user.id === p.id ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-elevated)',
                border: `2px solid ${user.id === p.id ? 'var(--emerald-500)' : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
              onClick={() => onSelectProfile(p.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={p.avatar} alt={p.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--emerald-400)' }} />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '1rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: '600' }}>{p.goal}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <div>• Diet: <strong>{p.dietType}</strong></div>
                <div>• Weight: <strong>{p.weight} kg</strong> (Target: {p.targetWeight} kg)</div>
                <div>• Target: <strong style={{ color: 'var(--emerald-400)' }}>{p.targetCalories} kcal</strong></div>
              </div>

              {user.id === p.id && (
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--emerald-400)', fontWeight: '700', fontSize: '0.85rem' }}>
                  <Check size={16} /> Active Profile
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Target Macro Calibration */}
      <div className="glass-card">
        <div className="glass-card-header">
          <h3 className="card-title">
            <Sliders size={20} color="var(--accent-cyan)" /> Caloric Target Calibration
          </h3>
        </div>

        <div className="grid-3">
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Daily Calorie Target (kcal)</label>
            <input
              type="number"
              value={user.targetCalories}
              onChange={(e) => onUpdateUserTarget({ targetCalories: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '1rem', fontWeight: '700' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Protein (grams)</label>
            <input
              type="number"
              value={user.targetProtein}
              onChange={(e) => onUpdateUserTarget({ targetProtein: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '1rem', fontWeight: '700' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Carbs (grams)</label>
            <input
              type="number"
              value={user.targetCarbs}
              onChange={(e) => onUpdateUserTarget({ targetCarbs: Number(e.target.value) })}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff', fontSize: '1rem', fontWeight: '700' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

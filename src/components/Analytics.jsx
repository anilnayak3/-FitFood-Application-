import React from 'react';
import { TrendingUp, Award, BarChart3, PieChart, ShieldCheck, Zap } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, AreaChart, Area } from 'recharts';
import { WEIGHT_HISTORY_14_DAYS } from '../data/foodDatabase';

export default function Analytics({ user }) {
  const currentWeight = WEIGHT_HISTORY_14_DAYS[WEIGHT_HISTORY_14_DAYS.length - 1].weight;
  const weightDiff = (currentWeight - WEIGHT_HISTORY_14_DAYS[0].weight).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(6, 182, 212, 0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <TrendingUp size={20} color="var(--accent-purple)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-purple)', fontWeight: '700', textTransform: 'uppercase' }}>
                Long-Term Progress & Biometrics
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Body Composition & Nutrition Analytics</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Detailed trends on weight change, calorie deficits, macro compliance, and micronutrients.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>14-Day Weight Change</div>
              <div style={{ fontSize: '1.25rem', fontWeight: '800', color: weightDiff <= 0 ? 'var(--emerald-400)' : 'var(--accent-amber)' }}>
                {weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid-2">
        {/* Chart 1: Weight Loss / Muscle Gain Trend */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">
              <TrendingUp size={20} color="var(--emerald-400)" /> Weight Trajectory (14 Days)
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target: {user.targetWeight} kg</span>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEIGHT_HISTORY_14_DAYS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="day" stroke="var(--text-subtle)" fontSize={12} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--text-subtle)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#1E293B', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Daily Calorie Intake vs Target */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">
              <BarChart3 size={20} color="var(--accent-cyan)" /> Daily Calorie Consistency
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target: {user.targetCalories} kcal</span>
          </div>

          <div style={{ width: '100%', height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEIGHT_HISTORY_14_DAYS}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.06)" />
                <XAxis dataKey="day" stroke="var(--text-subtle)" fontSize={12} />
                <YAxis stroke="var(--text-subtle)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: '#1E293B', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="calories" fill="#06B6D4" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Micronutrients & Score Summary */}
      <div className="glass-card">
        <div className="glass-card-header">
          <h3 className="card-title">
            <ShieldCheck size={20} color="var(--emerald-400)" /> Micronutrient Quality Score
          </h3>
          <span className="tag-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399' }}>
            Score: 94/100 (Optimal)
          </span>
        </div>

        <div className="grid-4">
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dietary Fiber</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--emerald-400)', margin: '0.2rem 0' }}>32g</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Goal: 30g+ (106%)</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sodium Intake</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-amber)', margin: '0.2rem 0' }}>1,840mg</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Max: 2,300mg (Normal)</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Vitamin C</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-cyan)', margin: '0.2rem 0' }}>140mg</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Goal: 90mg (155%)</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Potassium</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-purple)', margin: '0.2rem 0' }}>3,400mg</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Goal: 3,500mg (97%)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

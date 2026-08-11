import React, { useState } from 'react';
import { Activity, Dumbbell, Flame, Plus, RefreshCw, CheckCircle2, Watch, HeartPulse, Zap } from 'lucide-react';
import { WORKOUT_CATALOG } from '../data/foodDatabase';

export default function WorkoutTracker({ todayWorkouts, onAddWorkout, onDeleteWorkout }) {
  const [selectedExercise, setSelectedExercise] = useState(WORKOUT_CATALOG[0]);
  const [durationMins, setDurationMins] = useState(45);
  const [isSyncingWearable, setIsSyncingWearable] = useState(false);
  const [syncStatus, setSyncStatus] = useState('Apple Health connected (Synced 10m ago)');

  const calculatedBurn = Math.round(selectedExercise.caloriesPerMin * durationMins);
  const totalBurned = todayWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

  const handleLogExercise = (e) => {
    e.preventDefault();
    const newWorkout = {
      id: 'w_' + Date.now(),
      name: selectedExercise.name,
      duration: Number(durationMins),
      caloriesBurned: calculatedBurn,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Manual Input'
    };
    onAddWorkout(newWorkout);
  };

  const handleSyncWearable = () => {
    setIsSyncingWearable(true);
    setTimeout(() => {
      setIsSyncingWearable(false);
      setSyncStatus(`Apple Watch Series 9 Synced just now (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
      // Add auto-synced workout
      const syncedExercise = {
        id: 'w_sync_' + Date.now(),
        name: 'Zone 2 Outdoor Run (Garmin GPS)',
        duration: 35,
        caloriesBurned: 310,
        time: 'Just now',
        status: 'Synced via Wearable'
      };
      onAddWorkout(syncedExercise);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(244, 63, 94, 0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <Flame size={20} color="var(--accent-amber)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-amber)', fontWeight: '700', textTransform: 'uppercase' }}>
                Energy Burn & Physical Activity
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Fitness & Workout Activity Tracker</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Log exercises and sync wearable devices to calculate live active calorie burn.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="btn-secondary" onClick={handleSyncWearable} disabled={isSyncingWearable}>
              <Watch size={18} color="var(--accent-cyan)" /> {isSyncingWearable ? 'Syncing...' : 'Sync Wearable'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Log New Workout Form */}
        <div className="glass-card">
          <div className="glass-card-header">
            <h3 className="card-title">
              <Dumbbell size={20} color="var(--emerald-400)" /> Log New Workout Activity
            </h3>
          </div>

          <form onSubmit={handleLogExercise} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.4rem', display: 'block' }}>
                Select Workout Routine
              </label>
              <select
                value={selectedExercise.id}
                onChange={(e) => setSelectedExercise(WORKOUT_CATALOG.find(w => w.id === e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem'
                }}
              >
                {WORKOUT_CATALOG.map(w => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.type} • ~{w.caloriesPerMin * 60} kcal/hr)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Duration (Minutes):</span>
                <strong style={{ color: 'var(--emerald-400)' }}>{durationMins} mins</strong>
              </div>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--emerald-500)' }}
              />
            </div>

            {/* Estimated Energy Burn Display */}
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Calorie Burn:</span>
                <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-amber)' }}>
                  {calculatedBurn} <small style={{ fontSize: '0.85rem' }}>kcal</small>
                </div>
              </div>
              <button type="submit" className="btn-primary">
                <Plus size={18} /> Add to Log
              </button>
            </div>
          </form>
        </div>

        {/* Today's Logged Workouts & Wearable Sync */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Wearable Status Card */}
          <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Watch size={20} color="var(--accent-cyan)" />
                <span style={{ fontWeight: '700', fontSize: '0.95rem' }}>Device Sync Status</span>
              </div>
              <span className="tag-pill" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38BDF8' }}>
                Active Sync
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {syncStatus}
            </p>
          </div>

          {/* Logged Workouts List */}
          <div className="glass-card" style={{ flex: 1 }}>
            <div className="glass-card-header">
              <h3 className="card-title">
                <Activity size={20} color="var(--accent-amber)" /> Today's Logged Workouts
              </h3>
              <span style={{ fontWeight: '800', color: 'var(--accent-amber)', fontSize: '1.1rem' }}>
                Total: {totalBurned} kcal
              </span>
            </div>

            {todayWorkouts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                No workouts logged today yet.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {todayWorkouts.map(w => (
                  <div key={w.id} style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{w.name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {w.duration} mins • {w.time} • <span style={{ color: 'var(--emerald-400)' }}>{w.status}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontWeight: '800', color: 'var(--accent-amber)', fontSize: '1rem' }}>
                        -{w.caloriesBurned} kcal
                      </span>
                      <button className="btn-icon-only" style={{ width: '28px', height: '28px', color: 'var(--accent-rose)' }} onClick={() => onDeleteWorkout(w.id)}>
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

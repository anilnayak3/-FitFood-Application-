import React, { useState } from 'react';
import { Search, Camera, Barcode, Plus, Sparkles, Check, Flame, AlertCircle } from 'lucide-react';
import { FOOD_DATABASE, MOCK_SCAN_TEMPLATES } from '../data/foodDatabase';

export default function FoodLoggerModal({ initialTab = 'search', onClose, onAddMeal }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'search' | 'photo' | 'barcode' | 'custom'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('Lunch');

  // Search tab state
  const [selectedFood, setSelectedFood] = useState(FOOD_DATABASE[0]);
  const [servings, setServings] = useState(1);

  // Photo Scan State
  const [activeScanPreset, setActiveScanPreset] = useState(MOCK_SCAN_TEMPLATES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  // Barcode tab state
  const [barcodeInput, setBarcodeInput] = useState('890123456701');
  const [barcodeResult, setBarcodeResult] = useState(null);

  // Custom meal state
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');
  const [customProtein, setCustomProtein] = useState('');
  const [customCarbs, setCustomCarbs] = useState('');
  const [customFat, setCustomFat] = useState('');

  const filteredFoods = FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogSearchFood = () => {
    if (!selectedFood) return;
    const mealEntry = {
      id: 'm_' + Date.now(),
      mealType: selectedMealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: selectedFood.name,
      items: [{ name: selectedFood.name, qty: `${servings}x (${selectedFood.servingSize})`, calories: Math.round(selectedFood.calories * servings), protein: selectedFood.protein * servings, carbs: selectedFood.carbs * servings, fat: selectedFood.fat * servings }],
      calories: Math.round(selectedFood.calories * servings),
      protein: Math.round(selectedFood.protein * servings * 10) / 10,
      carbs: Math.round(selectedFood.carbs * servings * 10) / 10,
      fat: Math.round(selectedFood.fat * servings * 10) / 10,
      verifiedByAI: false
    };
    onAddMeal(mealEntry);
    onClose();
  };

  const handleStartAIScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(activeScanPreset);
    }, 1800);
  };

  const handleLogAIScanResult = () => {
    if (!scanResult) return;
    const mealEntry = {
      id: 'm_' + Date.now(),
      mealType: selectedMealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: scanResult.title,
      items: scanResult.detectedItems.map(item => ({
        name: item.name,
        qty: item.portion,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat
      })),
      calories: scanResult.totalCalories,
      protein: scanResult.totalProtein,
      carbs: scanResult.totalCarbs,
      fat: scanResult.totalFat,
      verifiedByAI: true
    };
    onAddMeal(mealEntry);
    onClose();
  };

  const handleBarcodeLookup = () => {
    const found = FOOD_DATABASE.find(f => f.barcode === barcodeInput.trim());
    if (found) {
      setBarcodeResult(found);
    } else {
      setBarcodeResult('not_found');
    }
  };

  const handleLogCustomMeal = (e) => {
    e.preventDefault();
    if (!customName || !customCalories) return;
    const mealEntry = {
      id: 'm_' + Date.now(),
      mealType: selectedMealType,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      name: customName,
      items: [{ name: customName, qty: '1 serving', calories: Number(customCalories), protein: Number(customProtein || 0), carbs: Number(customCarbs || 0), fat: Number(customFat || 0) }],
      calories: Number(customCalories),
      protein: Number(customProtein || 0),
      carbs: Number(customCarbs || 0),
      fat: Number(customFat || 0),
      verifiedByAI: false
    };
    onAddMeal(mealEntry);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="brand-icon-wrapper" style={{ width: '32px', height: '32px' }}>
              <Plus size={18} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Log Food & Meal Entry</h3>
          </div>
          <button className="btn-icon-only" onClick={onClose}>✕</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Meal Category Selector (Breakfast, Lunch, Dinner, Snack) */}
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>
              Assign to Meal Category
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(type => (
                <button
                  key={type}
                  className={`tag-pill ${selectedMealType === type ? 'active' : ''}`}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    padding: '0.5rem',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    background: selectedMealType === type ? 'var(--emerald-600)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedMealType === type ? '#ffffff' : 'var(--text-muted)'
                  }}
                  onClick={() => setSelectedMealType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="nav-tabs" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <button className={`nav-tab-btn ${activeTab === 'search' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveTab('search')}>
              <Search size={16} /> Search Database
            </button>
            <button className={`nav-tab-btn ${activeTab === 'photo' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveTab('photo')}>
              <Camera size={16} /> AI Photo Scan
            </button>
            <button className={`nav-tab-btn ${activeTab === 'barcode' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveTab('barcode')}>
              <Barcode size={16} /> Barcode
            </button>
            <button className={`nav-tab-btn ${activeTab === 'custom' ? 'active' : ''}`} style={{ flex: 1, justifyContent: 'center' }} onClick={() => setActiveTab('custom')}>
              <Plus size={16} /> Custom
            </button>
          </div>

          {/* TAB 1: DATABASE SEARCH */}
          {activeTab === 'search' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Search 1,000+ verified food items (e.g. Chicken, Oats, Salmon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem 0.6rem 2.4rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ maxHeight: '220px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {filteredFoods.map(food => (
                  <div
                    key={food.id}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: selectedFood?.id === food.id ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${selectedFood?.id === food.id ? 'var(--emerald-500)' : 'transparent'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                    onClick={() => setSelectedFood(food)}
                  >
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{food.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {food.servingSize} • P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                      </div>
                    </div>
                    <span style={{ fontWeight: '700', color: 'var(--emerald-400)', fontSize: '0.9rem' }}>
                      {food.calories} kcal
                    </span>
                  </div>
                ))}
              </div>

              {selectedFood && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-elevated)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginTop: '0.5rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Number of Servings:</label>
                    <input
                      type="number"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={servings}
                      onChange={(e) => setServings(Number(e.target.value))}
                      style={{ width: '80px', marginLeft: '0.5rem', padding: '0.3rem', borderRadius: '4px', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                    />
                  </div>

                  <button className="btn-primary" onClick={handleLogSearchFood}>
                    Log {Math.round(selectedFood.calories * servings)} kcal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: AI PHOTO SCANNER */}
          {activeTab === 'photo' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Select a sample photo plate or point your camera to simulate AI photo recognition:
              </div>

              {/* Sample Presets selector */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {MOCK_SCAN_TEMPLATES.map(tpl => (
                  <button
                    key={tpl.id}
                    className={`tag-pill ${activeScanPreset.id === tpl.id ? 'active' : ''}`}
                    style={{
                      flex: 1,
                      padding: '0.4rem',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                      background: activeScanPreset.id === tpl.id ? 'var(--emerald-600)' : 'rgba(255, 255, 255, 0.05)',
                      color: activeScanPreset.id === tpl.id ? '#fff' : 'var(--text-muted)'
                    }}
                    onClick={() => {
                      setActiveScanPreset(tpl);
                      setScanResult(null);
                    }}
                  >
                    {tpl.title.split(' ')[0]} Plate
                  </button>
                ))}
              </div>

              {/* Camera Scanner Viewport */}
              <div className="scanner-frame">
                <img src={activeScanPreset.image} alt="Plate Scan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                {isScanning && (
                  <>
                    <div className="scanner-overlay" />
                    <div className="scanner-laser" />
                    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0, 0, 0, 0.85)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--emerald-400)', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Sparkles size={16} /> Analyzing Plate Portion & Macros...
                    </div>
                  </>
                )}

                {scanResult && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 15, 23, 0.88)', padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--emerald-400)', fontWeight: '800', fontSize: '0.9rem' }}>
                        ✓ AI Confidence {scanResult.confidence}
                      </span>
                      <span className="tag-pill" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34D399' }}>
                        Verified Match
                      </span>
                    </div>

                    <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{scanResult.title}</div>

                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Detected Ingredients Breakdown:</div>
                    {scanResult.detectedItems.map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', padding: '0.3rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <span>{item.name} ({item.portion})</span>
                        <span style={{ color: 'var(--emerald-400)', fontWeight: '600' }}>{item.calories} kcal</span>
                      </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', fontWeight: '800', fontSize: '1rem' }}>
                      <span>Total Extracted Energy:</span>
                      <span style={{ color: 'var(--emerald-400)' }}>{scanResult.totalCalories} kcal</span>
                    </div>
                  </div>
                )}
              </div>

              {!scanResult ? (
                <button className="btn-primary" style={{ justifyContent: 'center' }} onClick={handleStartAIScan} disabled={isScanning}>
                  <Sparkles size={18} /> {isScanning ? 'Scanning...' : 'Scan Plate with FitFood AI'}
                </button>
              ) : (
                <button className="btn-primary" style={{ justifyContent: 'center' }} onClick={handleLogAIScanResult}>
                  <Check size={18} /> Log Extracted Meals ({scanResult.totalCalories} kcal)
                </button>
              )}
            </div>
          )}

          {/* TAB 3: BARCODE SCANNER */}
          {activeTab === 'barcode' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="scanner-frame" style={{ height: '160px' }}>
                <div className="scanner-overlay" />
                <div className="scanner-laser" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Point camera at food packaging barcode
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Enter barcode e.g. 890123456701"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.6rem 0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-main)'
                  }}
                />
                <button className="btn-secondary" onClick={handleBarcodeLookup}>
                  Lookup
                </button>
              </div>

              {barcodeResult && barcodeResult !== 'not_found' && (
                <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--emerald-500)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>{barcodeResult.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      P: {barcodeResult.protein}g | C: {barcodeResult.carbs}g | F: {barcodeResult.fat}g
                    </div>
                  </div>
                  <button className="btn-primary" onClick={() => { setSelectedFood(barcodeResult); setActiveTab('search'); }}>
                    Select Item
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CUSTOM MEAL */}
          {activeTab === 'custom' && (
            <form onSubmit={handleLogCustomMeal} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Meal Description / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Homemade Turkey Wrap"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                />
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Calories (kcal)</label>
                  <input
                    type="number"
                    required
                    placeholder="450"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Protein (grams)</label>
                  <input
                    type="number"
                    placeholder="35"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Carbohydrates (grams)</label>
                  <input
                    type="number"
                    placeholder="40"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fats (grams)</label>
                  <input
                    type="number"
                    placeholder="12"
                    value={customFat}
                    onChange={(e) => setCustomFat(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', color: '#fff' }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                Save Custom Meal Entry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

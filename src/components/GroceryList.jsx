import React, { useState } from 'react';
import { ShoppingBag, CheckSquare, Square, Plus, Copy, Check, Printer, Trash2 } from 'lucide-react';

export default function GroceryList({ groceryItems, onToggleItem, onAddItem, onDeleteItem }) {
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  const [copiedToast, setCopiedToast] = useState(false);

  const categories = ['Produce', 'Lean Meats & Fish', 'Dairy & Eggs', 'Pantry & Spices', 'Supplements'];

  const handleAddNew = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    onAddItem(newItemText.trim(), newItemCategory);
    setNewItemText('');
  };

  const handleCopyList = () => {
    const formatted = groceryItems
      .map(item => `${item.checked ? '[x]' : '[ ]'} ${item.name} (${item.category})`)
      .join('\n');
    navigator.clipboard.writeText(formatted);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <ShoppingBag size={20} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: '700', textTransform: 'uppercase' }}>
                Smart Meal Prep Shopping
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>AI Grocery & Pantry List</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Automatically compiled ingredients from your selected weekly meal plan and custom items.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" onClick={handleCopyList}>
              {copiedToast ? <Check size={18} color="var(--emerald-400)" /> : <Copy size={18} />}
              {copiedToast ? 'Copied to Clipboard!' : 'Copy List'}
            </button>
          </div>
        </div>
      </div>

      {/* Add New Item Form */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem' }}>
        <form onSubmit={handleAddNew} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Add item (e.g. 2 cartons Almond Milk)..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            style={{
              flex: 1,
              minWidth: '220px',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.9rem'
            }}
          />
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            style={{
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              color: '#fff',
              fontSize: '0.9rem'
            }}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary">
            <Plus size={18} /> Add to List
          </button>
        </form>
      </div>

      {/* Categorized List View */}
      <div className="grid-2">
        {categories.map(cat => {
          const itemsInCat = groceryItems.filter(item => item.category === cat);
          if (itemsInCat.length === 0) return null;

          return (
            <div key={cat} className="glass-card">
              <div className="glass-card-header">
                <h3 className="card-title" style={{ fontSize: '1rem' }}>
                  {cat} ({itemsInCat.filter(i => i.checked).length}/{itemsInCat.length})
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {itemsInCat.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: item.checked ? 'rgba(255, 255, 255, 0.02)' : 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      opacity: item.checked ? 0.6 : 1,
                      textDecoration: item.checked ? 'line-through' : 'none'
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flex: 1 }}
                      onClick={() => onToggleItem(item.id)}
                    >
                      {item.checked ? <CheckSquare size={18} color="var(--emerald-400)" /> : <Square size={18} color="var(--text-muted)" />}
                      <span style={{ fontSize: '0.9rem', color: item.checked ? 'var(--text-muted)' : 'var(--text-main)' }}>
                        {item.name}
                      </span>
                    </div>

                    <button
                      className="btn-icon-only"
                      style={{ width: '26px', height: '26px', color: 'var(--accent-rose)', opacity: 0.7 }}
                      onClick={() => onDeleteItem(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

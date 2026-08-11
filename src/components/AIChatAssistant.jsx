import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Bot, RefreshCw, Lightbulb, ChevronDown } from 'lucide-react';
import { AI_CHAT_PROMPTS } from '../data/foodDatabase';

export default function AIChatAssistant({ user, todayMeals, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello ${user.name}! I am your **FitFood AI Nutrition & Fitness Coach**. How can I help you optimize your diet or meal plan today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI response generation
    setTimeout(() => {
      let botReply = '';
      const lower = query.toLowerCase();

      if (lower.includes('protein')) {
        botReply = `To hit your target of **${user.targetProtein}g protein** efficiently today without overloading fats:
1. Scoop 1.5 scoops of Whey Isolate in iced almond milk (**38g protein**, ~180 kcal).
2. Snack on 170g non-fat Greek yogurt with cinnamon (**18g protein**, ~90 kcal).
3. Choose seared tuna or grilled chicken breast for dinner (**45g protein**, ~220 kcal).`;
      } else if (lower.includes('keto') || lower.includes('carb')) {
        botReply = `For a Keto/Low-Carb meal plan matched to your target calories:
• **Breakfast**: 3 scrambled eggs cooked in butter + 1/2 sliced avocado.
• **Lunch**: Cobb salad with grilled chicken breast, bacon crumbles, blue cheese & olive oil.
• **Dinner**: Pan-seared ribeye steak with creamed garlic spinach.`;
      } else if (lower.includes('recovery') || lower.includes('post-workout')) {
        botReply = `Great question! The optimal post-workout recovery meal within 45 mins of training should follow a **3:1 or 2:1 Carb-to-Protein ratio** for muscle glycogen resynthesis.
Try 40g oats + 1 scoop vanilla protein powder + 1/2 banana + 10g honey (**~380 kcal, 32g P, 54g C**).`;
      } else if (lower.includes('bmr') || lower.includes('tdee')) {
        botReply = `Here is your metabolic baseline calculation:
• **BMR (Basal Metabolic Rate)**: ${user.bmr} kcal (calories burned at rest).
• **TDEE (Total Daily Energy Expenditure)**: ${user.tdee} kcal (includes physical activity).
To maintain your goal of *${user.goal}*, we set your daily intake target to **${user.targetCalories} kcal**.`;
      } else {
        botReply = `Based on your profile (*${user.dietType}*, target **${user.targetCalories} kcal**), I recommend keeping your protein high (${user.targetProtein}g target) and timing your largest carbohydrate portion around your workout window for maximum performance & fat loss efficiency!`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '650px', padding: '0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(16, 185, 129, 0.15) 100%)', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, var(--accent-purple), var(--emerald-500))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800' }}>FitFood AI Nutrition Assistant</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: '600' }}>● Connected & Calibrated</span>
          </div>
        </div>
        {onClose && <button className="btn-icon-only" onClick={onClose}>✕</button>}
      </div>

      {/* Suggested Prompts */}
      <div style={{ padding: '0.65rem 1rem', background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.4rem', overflowX: 'auto' }}>
        {AI_CHAT_PROMPTS.slice(0, 3).map((prompt, idx) => (
          <button
            key={idx}
            className="tag-pill"
            style={{ whiteSpace: 'nowrap', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}
            onClick={() => handleSendMessage(prompt)}
          >
            <Lightbulb size={12} color="var(--accent-amber)" /> {prompt}
          </button>
        ))}
      </div>

      {/* Messages Container */}
      <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              gap: '0.75rem',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%'
            }}
          >
            {msg.sender === 'bot' && (
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--emerald-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <Bot size={18} />
              </div>
            )}

            <div
              style={{
                background: msg.sender === 'user' ? 'linear-gradient(135deg, var(--emerald-600), var(--emerald-500))' : 'var(--bg-elevated)',
                color: '#ffffff',
                padding: '0.85rem 1.1rem',
                borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                border: msg.sender === 'user' ? 'none' : '1px solid var(--border-subtle)',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                whiteSpace: 'pre-line'
              }}
            >
              {msg.text}
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.5)', marginTop: '0.3rem', textAlign: 'right' }}>
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <img src={user.avatar} alt="User Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <Sparkles size={16} className="spin" color="var(--emerald-400)" /> FitFood AI is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div style={{ padding: '1rem', background: 'var(--bg-card)', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Ask FitFood AI about macros, recipes, or workout recovery..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          style={{
            flex: 1,
            padding: '0.75rem 1rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-elevated)',
            color: 'var(--text-main)',
            fontSize: '0.9rem'
          }}
        />
        <button className="btn-primary" style={{ borderRadius: 'var(--radius-full)', padding: '0.75rem 1.25rem' }} onClick={() => handleSendMessage()}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

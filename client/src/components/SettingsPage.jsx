import { useState } from 'react'
import { Eye, EyeOff, ExternalLink, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [geminiKey, setGeminiKey] = useState('')
  const [openrouterKey, setOpenrouterKey] = useState('')
  const [showGemini, setShowGemini] = useState(false)
  const [showOr, setShowOr] = useState(false)

  const handleSave = () => {
    toast('API keys server ke .env file mein save karni hain', { icon: 'ℹ️' })
  }

  const s = {
    wrap: { maxWidth: '680px' },
    card: { background: '#161b22', border: '1px solid #21262d', borderRadius: '12px', padding: '20px', marginBottom: '16px' },
    label: { fontSize: '12px', color: '#8b949e', marginBottom: '6px', display: 'block' },
    inputRow: { display: 'flex', gap: '8px', alignItems: 'center' },
    input: { flex: 1, background: '#0d1117', border: '1px solid #30363d', color: '#c9d1d9', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', fontFamily: 'monospace', outline: 'none' },
    iconBtn: { background: 'transparent', border: '1px solid #30363d', color: '#8b949e', borderRadius: '6px', padding: '8px', cursor: 'pointer', display: 'flex' },
    link: { fontSize: '12px', color: '#58a6ff', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px', textDecoration: 'none' },
    saveBtn: { background: '#238636', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 20px', fontSize: '13px', cursor: 'pointer', fontWeight: 500, marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' },
    tip: { background: '#1f6feb11', border: '1px solid #1f6feb33', borderRadius: '8px', padding: '12px 16px', fontSize: '12px', color: '#58a6ff', lineHeight: 1.7 },
  }

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <h3 style={{ fontSize: '14px', marginBottom: '16px', color: '#e6edf3' }}>API Configuration</h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={s.label}>Gemini API Key (Google AI Studio)</label>
          <div style={s.inputRow}>
            <input style={s.input} type={showGemini ? 'text' : 'password'}
              placeholder="AIzaSy..." value={geminiKey} onChange={e => setGeminiKey(e.target.value)} />
            <button style={s.iconBtn} onClick={() => setShowGemini(v => !v)}>
              {showGemini ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={s.link}>
            Get free API key <ExternalLink size={11} />
          </a>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={s.label}>OpenRouter API Key</label>
          <div style={s.inputRow}>
            <input style={s.input} type={showOr ? 'text' : 'password'}
              placeholder="sk-or-..." value={openrouterKey} onChange={e => setOpenrouterKey(e.target.value)} />
            <button style={s.iconBtn} onClick={() => setShowOr(v => !v)}>
              {showOr ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" style={s.link}>
            Get API key <ExternalLink size={11} />
          </a>
        </div>

        <button style={s.saveBtn} onClick={handleSave}>
          <CheckCircle size={14} /> Save Instructions
        </button>
      </div>

      <div style={s.tip}>
        <strong style={{ color: '#79c0ff' }}>API Keys kahan daalein?</strong><br />
        Keys directly <code style={{ background: '#0d1117', padding: '1px 5px', borderRadius: '3px' }}>server/.env</code> file mein daalo:<br /><br />
        <code style={{ background: '#0d1117', padding: '4px 8px', borderRadius: '4px', display: 'block', color: '#a5d6ff' }}>
          GEMINI_API_KEY=your_key_here<br />
          OPENROUTER_API_KEY=your_key_here
        </code>
      </div>

      <div style={{ ...s.card, marginTop: '16px' }}>
        <h3 style={{ fontSize: '14px', marginBottom: '12px', color: '#e6edf3' }}>Available AI Models</h3>
        {[
          { name: 'Gemini 1.5 Flash', provider: 'Google', cost: 'Free', badge: '#3fb950' },
          { name: 'GPT-4o Mini', provider: 'OpenRouter', cost: 'Cheap', badge: '#58a6ff' },
          { name: 'Claude 3 Haiku', provider: 'OpenRouter', cost: 'Cheap', badge: '#9f7aea' },
        ].map(m => (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #21262d' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: m.badge, flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: '#c9d1d9', flex: 1 }}>{m.name}</span>
            <span style={{ fontSize: '11px', color: '#484f58' }}>{m.provider}</span>
            <span style={{ fontSize: '11px', color: m.badge, background: `${m.badge}22`, padding: '2px 8px', borderRadius: '8px' }}>{m.cost}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

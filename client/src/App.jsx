import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Code2, History, Settings } from 'lucide-react'
import Editor from './components/Editor'
import ReviewPanel from './components/ReviewPanel'
import HistoryPage from './components/HistoryPage'
import SettingsPage from './components/SettingsPage'

const TABS = [
  { id: 'editor', label: 'Editor', Icon: Code2 },
  { id: 'history', label: 'History', Icon: History },
  { id: 'settings', label: 'Settings', Icon: Settings },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('editor')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ reviews: 0, bugs: 0 })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Toaster position="top-right" toastOptions={{ style: { background: '#161b22', color: '#c9d1d9', border: '1px solid #30363d' } }} />

      {/* Header */}
      <header style={{ background: '#161b22', borderBottom: '1px solid #21262d', padding: '0 24px', display: 'flex', alignItems: 'center', height: '56px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '32px' }}>
          <div style={{ width: '32px', height: '32px', background: '#1f6feb', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#fff' }}>
            {'{ }'}
          </div>
          <span style={{ fontWeight: 600, fontSize: '15px', color: '#e6edf3' }}>CodeReview AI</span>
        </div>

        <nav style={{ display: 'flex', gap: '4px' }}>
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: activeTab === id ? '#21262d' : 'transparent',
                color: activeTab === id ? '#e6edf3' : '#8b949e',
                fontSize: '13px', fontWeight: 500,
              }}>
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center', fontSize: '12px' }}>
          <span style={{ color: '#8b949e' }}>Reviews: <strong style={{ color: '#c9d1d9' }}>{stats.reviews}</strong></span>
          <span style={{ color: '#8b949e' }}>Bugs found: <strong style={{ color: '#ff7b72' }}>{stats.bugs}</strong></span>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: '20px 24px', overflow: 'hidden' }}>
        {activeTab === 'editor' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: 'calc(100vh - 96px)' }}>
            <Editor setReview={setReview} setLoading={setLoading} setStats={setStats} />
            <ReviewPanel review={review} loading={loading} />
          </div>
        )}
        {activeTab === 'history' && <HistoryPage />}
        {activeTab === 'settings' && <SettingsPage />}
      </main>
    </div>
  )
}

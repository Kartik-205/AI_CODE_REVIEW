import { useEffect, useState } from 'react'
import axios from 'axios'
import { Trash2, Clock, Code2, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/history')
      .then(r => setHistory(r.data))
      .catch(() => toast.error('History load nahi hui'))
      .finally(() => setLoading(false))
  }, [])

  const deleteOne = async (id, e) => {
    e.stopPropagation()
    await axios.delete(`/api/history/${id}`)
    setHistory(h => h.filter(r => r._id !== id))
    if (selected?._id === id) setSelected(null)
    toast.success('Deleted!')
  }

  const clearAll = async () => {
    if (!confirm('Saari history delete karni hai?')) return
    await axios.delete('/api/history')
    setHistory([])
    setSelected(null)
    toast.success('History cleared!')
  }

  const providerColor = (p) => p === 'gemini' ? '#3fb950' : '#58a6ff'

  const s = {
    wrap: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '16px', height: 'calc(100vh - 96px)' },
    sidebar: { background: '#0d1117', border: '1px solid #21262d', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    sideHeader: { background: '#161b22', borderBottom: '1px solid #21262d', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    list: { flex: 1, overflowY: 'auto' },
    item: (active) => ({
      padding: '12px 16px', borderBottom: '1px solid #21262d', cursor: 'pointer',
      background: active ? '#1f6feb11' : 'transparent',
      borderLeft: active ? '2px solid #1f6feb' : '2px solid transparent',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }),
    main: { background: '#0d1117', border: '1px solid #21262d', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
    mainHeader: { background: '#161b22', borderBottom: '1px solid #21262d', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' },
    body: { flex: 1, overflowY: 'auto', padding: '20px' },
  }

  return (
    <div style={s.wrap}>
      <div style={s.sidebar}>
        <div style={s.sideHeader}>
          <span style={{ fontSize: '12px', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} /> {history.length} reviews
          </span>
          {history.length > 0 && (
            <button onClick={clearAll}
              style={{ fontSize: '11px', color: '#f8514966', background: 'none', border: 'none', cursor: 'pointer' }}>
              Clear all
            </button>
          )}
        </div>

        <div style={s.list}>
          {loading && <p style={{ padding: '16px', fontSize: '12px', color: '#484f58' }}>Loading...</p>}
          {!loading && history.length === 0 && (
            <p style={{ padding: '16px', fontSize: '12px', color: '#484f58' }}>Abhi koi review nahi hai</p>
          )}
          {history.map(r => (
            <div key={r._id} onClick={() => setSelected(r)} style={s.item(selected?._id === r._id)}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <Code2 size={11} color="#8b949e" />
                  <span style={{ fontSize: '13px', color: '#c9d1d9', fontWeight: 500 }}>{r.language}</span>
                  <span style={{ fontSize: '10px', color: providerColor(r.provider), background: `${providerColor(r.provider)}22`, padding: '1px 6px', borderRadius: '8px' }}>{r.provider}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#484f58' }}>
                  {new Date(r.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trash2 size={13} color="#484f58"
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={e => e.target.style.color = '#f85149'}
                  onMouseLeave={e => e.target.style.color = '#484f58'}
                  onClick={e => deleteOne(r._id, e)} />
                <ChevronRight size={12} color="#484f58" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.main}>
        {selected ? (
          <>
            <div style={s.mainHeader}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#c9d1d9' }}>
                {selected.language} — {selected.provider}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#484f58' }}>
                {new Date(selected.createdAt).toLocaleString()}
              </span>
            </div>
            <div style={s.body}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '11px', color: '#484f58', marginBottom: '6px' }}>Submitted code</p>
                <pre><code>{selected.code}</code></pre>
              </div>
              <div className="markdown-body">
                <ReactMarkdown>{selected.review}</ReactMarkdown>
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#484f58', flexDirection: 'column', gap: '8px' }}>
            <Clock size={32} />
            <p style={{ fontSize: '14px' }}>Koi review select karo</p>
          </div>
        )}
      </div>
    </div>
  )
}

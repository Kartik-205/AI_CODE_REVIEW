import ReactMarkdown from 'react-markdown'
import { Copy, CheckCheck, FileText } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ReviewPanel({ review, loading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(review)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const s = {
    wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0d1117', border: '1px solid #21262d', borderRadius: '12px', overflow: 'hidden' },
    header: { background: '#161b22', borderBottom: '1px solid #21262d', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' },
    title: { fontSize: '13px', fontWeight: 500, color: '#c9d1d9' },
    body: { flex: 1, overflowY: 'auto', padding: '16px' },
    empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#484f58', gap: '12px' },
  }

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <FileText size={14} color="#58a6ff" />
        <span style={s.title}>AI Review</span>
        {review && (
          <button onClick={handleCopy}
            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px', padding: '4px 12px', background: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
            {copied ? <CheckCheck size={12} color="#3fb950" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      <div style={s.body}>
        {loading && (
          <div style={s.empty}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #21262d', borderTopColor: '#1f6feb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ fontSize: '13px' }}>AI code review ho raha hai...</p>
          </div>
        )}

        {!loading && !review && (
          <div style={s.empty}>
            <div style={{ fontSize: '40px' }}>🤖</div>
            <p style={{ fontSize: '14px' }}>Code editor mein code likho</p>
            <p style={{ fontSize: '12px' }}>"Review Code" button click karo</p>
          </div>
        )}

        {!loading && review && (
          <div className="markdown-body">
            <ReactMarkdown>{review}</ReactMarkdown>
          </div>
        )}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// import { useState } from 'react'
// import CodeMirror from '@uiw/react-codemirror'
// import { javascript } from '@codemirror/lang-javascript'
// import { python } from '@codemirror/lang-python'
// import { java } from '@codemirror/lang-java'
// import { cpp } from '@codemirror/lang-cpp'
// import { rust } from '@codemirror/lang-rust'
// import { php } from '@codemirror/lang-php'
// import { oneDark } from '@codemirror/theme-one-dark'
// import { Play, RotateCcw, Zap } from 'lucide-react'
// import axios from 'axios'
// import toast from 'react-hot-toast'

// const LANGUAGES = [
//   'javascript', 'typescript', 'python', 'java', 'c++', 'c', 'rust', 'php', 'go', 'ruby', 'swift', 'kotlin'
// ]

// const PROVIDERS = [
//   { id: 'gemini', label: 'Gemini 1.5 Flash (Free)' },
//   { id: 'openrouter', label: 'OpenRouter GPT-4o Mini' },
//   { id: 'openrouter-claude', label: 'OpenRouter Claude 3 Haiku' },
// ]

// const SAMPLE_CODE = {
//   javascript: `async function fetchUsers(id) {\n  const res = await fetch(\`/api/users/\${id}\`)\n  // Missing error handling\n  const data = await res.json()\n  return data\n}\n\nfunction processUsers(users) {\n  for(var i=0; i<=users.length; i++) {\n    console.log(users[i].name) // off-by-one bug\n  }\n}`,
//   python: `def calculate_average(numbers):\n    total = 0\n    for n in numbers:\n        total = total + n\n    return total / len(numbers)  # ZeroDivisionError if empty\n\ndef find_user(users, name):\n    for i in range(len(users)):\n        if users[i]['name'] == name:\n            return users[i]\n    return None`,
// }

// function getLangExtension(lang) {
//   if (lang === 'python') return [python()]
//   if (lang === 'java') return [java()]
//   if (lang === 'c++' || lang === 'c') return [cpp()]
//   if (lang === 'rust') return [rust()]
//   if (lang === 'php') return [php()]
//   return [javascript({ jsx: true, typescript: lang === 'typescript' })]
// }

// export default function Editor({ setReview, setLoading, setStats }) {
//   const [code, setCode] = useState(SAMPLE_CODE.javascript)
//   const [language, setLanguage] = useState('javascript')
//   const [provider, setProvider] = useState('gemini')
//   const [isReviewing, setIsReviewing] = useState(false)

//   const getProvider = () => {
//     if (provider === 'openrouter-claude') return { p: 'openrouter', m: 'anthropic/claude-3-haiku' }
//     if (provider === 'openrouter') return { p: 'openrouter', m: 'openai/gpt-4o-mini' }
//     return { p: 'gemini', m: '' }
//   }

//   const handleReview = async () => {
//     if (!code.trim()) return toast.error('Pehle code likho!')
//     setIsReviewing(true)
//     setLoading(true)
//     setReview('')

//     const { p, m } = getProvider()

//     try {
//       const res = await axios.post('/api/review', { code, language, provider: p, model: m })
//       setReview(res.data.review)
//       setStats(prev => ({ reviews: prev.reviews + 1, bugs: prev.bugs + (res.data.bugsCount || 0) }))
//       toast.success('Review complete!')
//     } catch (err) {
//       const msg = err.response?.data?.error || 'Review fail ho gaya'
//       toast.error(msg)
//       setReview(`**Error:** ${msg}`)
//     } finally {
//       setIsReviewing(false)
//       setLoading(false)
//     }
//   }

//   const handleLanguageChange = (lang) => {
//     setLanguage(lang)
//     if (SAMPLE_CODE[lang]) setCode(SAMPLE_CODE[lang])
//   }

//   const s = {
//     wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0d1117', border: '1px solid #21262d', borderRadius: '12px', overflow: 'hidden' },
//     header: { background: '#161b22', borderBottom: '1px solid #21262d', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' },
//     title: { fontSize: '13px', fontWeight: 500, color: '#c9d1d9' },
//     controls: { display: 'flex', gap: '8px', padding: '10px 14px', borderBottom: '1px solid #21262d', flexWrap: 'wrap', alignItems: 'center' },
//     sel: { background: '#21262d', border: '1px solid #30363d', color: '#c9d1d9', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer' },
//     btnReview: {
//       marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
//       padding: '7px 18px', background: isReviewing ? '#1f4f8b' : '#1f6feb',
//       color: '#fff', border: 'none', borderRadius: '6px', cursor: isReviewing ? 'not-allowed' : 'pointer',
//       fontSize: '13px', fontWeight: 500,
//     },
//     btnClear: {
//       display: 'flex', alignItems: 'center', gap: '4px',
//       padding: '6px 10px', background: 'transparent', color: '#8b949e',
//       border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
//     },
//   }

//   return (
//     <div style={s.wrap}>
//       <div style={s.header}>
//         <Zap size={14} color="#e3b341" />
//         <span style={s.title}>Code Editor</span>
//         <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#1f6feb22', color: '#58a6ff', padding: '2px 8px', borderRadius: '10px', border: '1px solid #1f6feb44' }}>
//           {language}
//         </span>
//       </div>

//       <div style={s.controls}>
//         <select style={s.sel} value={language} onChange={e => handleLanguageChange(e.target.value)}>
//           {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
//         </select>

//         <select style={s.sel} value={provider} onChange={e => setProvider(e.target.value)}>
//           {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
//         </select>

//         <button style={s.btnClear} onClick={() => setCode('')}>
//           <RotateCcw size={12} /> Clear
//         </button>

//         <button style={s.btnReview} onClick={handleReview} disabled={isReviewing}>
//           {isReviewing ? (
//             <><span style={{ width: '12px', height: '12px', border: '2px solid #fff4', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} /></>
//           ) : (
//             <><Play size={13} fill="#fff" /> Review Code</>
//           )}
//         </button>
//       </div>

//       <div style={{ flex: 1, overflow: 'hidden' }}>
//         <CodeMirror
//           value={code}
//           height="100%"
//           extensions={getLangExtension(language)}
//           theme={oneDark}
//           onChange={setCode}
//           style={{ height: '100%', fontSize: '13px' }}
//         />
//       </div>

//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   )
// }

import { useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { rust } from '@codemirror/lang-rust'
import { php } from '@codemirror/lang-php'
import { oneDark } from '@codemirror/theme-one-dark'
import { Play, RotateCcw, Zap } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'c++', 'c', 'rust', 'php', 'go', 'ruby', 'swift', 'kotlin'
]

const PROVIDERS = [
  { id: 'gemini', label: 'Gemini Flash (Free)' },
  { id: 'llama', label: 'Llama 3.1 8B (Free)' },
  { id: 'mistral', label: 'Mistral 7B (Free)' },
  { id: 'gemma', label: 'Gemma 2 9B (Free)' },
]

const SAMPLE_CODE = {
  javascript: `async function fetchUsers(id) {\n  const res = await fetch(\`/api/users/\${id}\`)\n  // Missing error handling\n  const data = await res.json()\n  return data\n}\n\nfunction processUsers(users) {\n  for(var i=0; i<=users.length; i++) {\n    console.log(users[i].name) // off-by-one bug\n  }\n}`,
  python: `def calculate_average(numbers):\n    total = 0\n    for n in numbers:\n        total = total + n\n    return total / len(numbers)  # ZeroDivisionError if empty\n\ndef find_user(users, name):\n    for i in range(len(users)):\n        if users[i]['name'] == name:\n            return users[i]\n    return None`,
}

function getLangExtension(lang) {
  if (lang === 'python') return [python()]
  if (lang === 'java') return [java()]
  if (lang === 'c++' || lang === 'c') return [cpp()]
  if (lang === 'rust') return [rust()]
  if (lang === 'php') return [php()]
  return [javascript({ jsx: true, typescript: lang === 'typescript' })]
}

export default function Editor({ setReview, setLoading, setStats }) {
  const [code, setCode] = useState(SAMPLE_CODE.javascript)
  const [language, setLanguage] = useState('javascript')
  const [provider, setProvider] = useState('gemini')
  const [isReviewing, setIsReviewing] = useState(false)

  const getProvider = () => {
    if (provider === 'gemini') return { p: 'gemini', m: '' }
    const modelMap = {
      llama: 'meta-llama/llama-3.1-8b-instruct:free',
      mistral: 'mistralai/mistral-7b-instruct:free',
      gemma: 'google/gemma-2-9b-it:free',
    }
    return { p: 'openrouter', m: modelMap[provider] }
  }

  const handleReview = async () => {
    if (!code.trim()) return toast.error('Pehle code likho!')
    setIsReviewing(true)
    setLoading(true)
    setReview('')

    const { p, m } = getProvider()

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/review`,
        { code, language, provider: p, model: m }
      )

      const reviewText = typeof res.data.review === 'string'
        ? res.data.review
        : JSON.stringify(res.data.review)

      setReview(reviewText)
      setStats(prev => ({
        reviews: prev.reviews + 1,
        bugs: prev.bugs + (res.data.bugsCount || 0)
      }))
      toast.success('Review complete!')
    } catch (err) {
      const msg = err.response?.data?.error || err.message || 'Review fail ho gaya'
      const msgStr = typeof msg === 'string' ? msg : 'Something went wrong'
      toast.error(msgStr)
      setReview(`**Error:** ${msgStr}`)
    } finally {
      setIsReviewing(false)
      setLoading(false)
    }
  }

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    if (SAMPLE_CODE[lang]) setCode(SAMPLE_CODE[lang])
  }

  const s = {
    wrap: { display: 'flex', flexDirection: 'column', height: '100%', background: '#0d1117', border: '1px solid #21262d', borderRadius: '12px', overflow: 'hidden' },
    header: { background: '#161b22', borderBottom: '1px solid #21262d', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' },
    title: { fontSize: '13px', fontWeight: 500, color: '#c9d1d9' },
    controls: { display: 'flex', gap: '8px', padding: '10px 14px', borderBottom: '1px solid #21262d', flexWrap: 'wrap', alignItems: 'center' },
    sel: { background: '#21262d', border: '1px solid #30363d', color: '#c9d1d9', borderRadius: '6px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer' },
    btnReview: {
      marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
      padding: '7px 18px', background: isReviewing ? '#1f4f8b' : '#1f6feb',
      color: '#fff', border: 'none', borderRadius: '6px', cursor: isReviewing ? 'not-allowed' : 'pointer',
      fontSize: '13px', fontWeight: 500,
    },
    btnClear: {
      display: 'flex', alignItems: 'center', gap: '4px',
      padding: '6px 10px', background: 'transparent', color: '#8b949e',
      border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer', fontSize: '12px',
    },
  }

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <Zap size={14} color="#e3b341" />
        <span style={s.title}>Code Editor</span>
        <span style={{ marginLeft: 'auto', fontSize: '11px', background: '#1f6feb22', color: '#58a6ff', padding: '2px 8px', borderRadius: '10px', border: '1px solid #1f6feb44' }}>
          {language}
        </span>
      </div>

      <div style={s.controls}>
        <select style={s.sel} value={language} onChange={e => handleLanguageChange(e.target.value)}>
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select style={s.sel} value={provider} onChange={e => setProvider(e.target.value)}>
          {PROVIDERS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>

        <button style={s.btnClear} onClick={() => setCode('')}>
          <RotateCcw size={12} /> Clear
        </button>

        <button style={s.btnReview} onClick={handleReview} disabled={isReviewing}>
          {isReviewing ? (
            <span style={{ width: '12px', height: '12px', border: '2px solid #fff4', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
          ) : (
            <><Play size={13} fill="#fff" /> Review Code</>
          )}
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <CodeMirror
          value={code}
          height="100%"
          extensions={getLangExtension(language)}
          theme={oneDark}
          onChange={setCode}
          style={{ height: '100%', fontSize: '13px' }}
        />
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

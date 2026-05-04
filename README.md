# AI Code Reviewer - MERN Stack

Ek powerful AI-based code reviewer jo Gemini aur OpenRouter ke saath kaam karta hai.

## Features
- Monaco-style code editor with syntax highlighting (12+ languages)
- AI code review with bug detection, optimization tips, security issues
- Review history with MongoDB
- Switch between Gemini and OpenRouter (GPT-4o, Claude Haiku)
- Dark GitHub-style UI

---
AIzaSyCY_XctUyjScP3MwJDkpwvUQZPgUQr-Vfg
## Setup & Run

### Step 1 — MongoDB install karo
- Download: https://www.mongodb.com/try/download/community
- Install karke MongoDB service start karo

### Step 2 — Server setup
```bash
cd server
npm install
```

**server/.env file mein apni keys daalo:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-code-reviewer
GEMINI_API_KEY=your_gemini_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
```

Server run karo:
```bash
npm run dev
```

### Step 3 — Client setup
```bash
cd client
npm install
npm run dev
```

### Step 4 — Browser mein kholo
```
http://localhost:5173
```

---

## API Keys kahan se lein?

**Gemini (Free):** https://aistudio.google.com/app/apikey

**OpenRouter:** https://openrouter.ai/keys

---

## Project Structure
```
ai-code-reviewer/
├── client/                  React + Vite frontend
│   └── src/
│       ├── App.jsx
│       ├── components/
│       │   ├── Editor.jsx
│       │   ├── ReviewPanel.jsx
│       │   ├── HistoryPage.jsx
│       │   └── SettingsPage.jsx
│       └── index.css
├── server/                  Express + Node.js backend
│   ├── models/Review.js
│   ├── routes/review.js
│   ├── routes/history.js
│   ├── services/gemini.js
│   ├── services/openrouter.js
│   ├── services/prompt.js
│   ├── index.js
│   └── .env
└── README.md
```




# Chitkara Full Stack Engineering Challenge — BFHL

> **Graph Hierarchy Analyser** · REST API + React UI

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan)](https://tailwindcss.com)

---

## 📁 Project Structure

```
chitkara_fullstack_project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── bfhlController.js    # POST /bfhl handler
│   │   ├── routes/
│   │   │   └── bfhl.js              # Express router
│   │   ├── utils/
│   │   │   ├── validator.js         # Edge validation logic
│   │   │   └── graphProcessor.js   # Tree/cycle building engine
│   │   └── index.js                 # Express entry point
│   ├── .env                         # Local env (gitignored)
│   ├── .env.example                 # Env template
│   ├── render.json                  # Render deployment config
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputPanel.jsx       # Textarea + examples + submit
│   │   │   ├── HierarchyCard.jsx    # Single tree/cycle display
│   │   │   ├── TreeView.jsx         # Interactive collapsible tree
│   │   │   ├── SummaryPanel.jsx     # Summary stats + user info
│   │   │   └── BadgeList.jsx        # Invalid/duplicate badges
│   │   ├── services/
│   │   │   └── api.js               # fetch wrapper for backend
│   │   ├── App.jsx                  # Root component + state
│   │   ├── main.jsx                 # React DOM entry
│   │   └── index.css                # Design system + Tailwind
│   ├── index.html                   # SEO-optimised HTML shell
│   ├── vite.config.js               # Vite + Tailwind plugin
│   ├── vercel.json                  # Vercel deployment config
│   ├── .env                         # Local env (gitignored)
│   └── package.json
│
├── postman_collection.json          # 10 test cases
└── README.md
```

---

## 🚀 Quick Start (Local Development)

### 1. Backend

```bash
cd backend
cp .env.example .env          # Edit USER_ID, EMAIL_ID, COLLEGE_ROLL_NUMBER
npm install
npm run dev                   # Starts on http://localhost:3000
```

### 2. Frontend

```bash
cd frontend
# .env already set to http://localhost:3000
npm install
npm run dev                   # Starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 🔌 API Reference

### `POST /bfhl`

**Request:**
```json
{
  "data": ["A->B", "A->C", "B->D"]
}
```

**Response:**
```json
{
  "user_id": "harash_01012000",
  "email_id": "harash@chitkara.edu.in",
  "college_roll_number": "2110990123",
  "hierarchies": [
    {
      "root": "A",
      "tree": { "B": { "D": {} }, "C": {} },
      "depth": 3,
      "has_cycle": false
    }
  ],
  "invalid_entries": [],
  "duplicate_edges": [],
  "summary": {
    "total_trees": 1,
    "total_cycles": 0,
    "largest_tree_root": "A"
  }
}
```

---

## 📐 Business Rules

| Rule | Behaviour |
|------|-----------|
| Valid edge | Single uppercase A-Z on both sides, `X->Y` format |
| Self-loop (`A->A`) | Invalid — goes into `invalid_entries` |
| Duplicate edge | First occurrence kept; extra occurrences in `duplicate_edges` |
| Multi-parent | First parent wins; subsequent claims silently ignored |
| Cycle | `has_cycle: true`, `tree: {}`, no `depth` field |
| No natural root | Lexicographically smallest node used as root |
| Depth | Number of nodes on longest root-to-leaf path |
| `largest_tree_root` | Deepest tree; tie broken by lex-smallest root |

---

## 🧪 Sample Test Cases

### Test 1 — Simple Tree
```json
Input:  ["A->B", "A->C", "B->D"]
Output: tree depth=3, root=A, largest_tree_root=A
```

### Test 2 — Duplicates
```json
Input:  ["A->B", "A->B", "A->B"]
Output: duplicate_edges=["A->B"], 1 tree (A->B)
```

### Test 3 — Cycle
```json
Input:  ["X->Y", "Y->Z", "Z->X"]
Output: has_cycle=true, tree={}
```

### Test 4 — All Invalid
```json
Input:  ["hello", "1->2", "AB->C", "A-B", "A->", "A->A", ""]
Output: invalid_entries=[...all 7...], hierarchies=[]
```

### Test 5 — Multi-Parent
```json
Input:  ["A->D", "B->D"]
Output: A wins D; B->D silently dropped (NOT in duplicate_edges)
```

### Test 6 — Multiple Components
```json
Input:  ["A->B", "B->C", "X->Y", "Y->Z"]
Output: 2 trees, both depth=3, largest_tree_root=A (lex tie-break)
```

### Test 7 — Full Mixed
```json
Input:  ["A->B","A->C","B->D","X->Y","Y->Z","Z->X","hello","1->2","A->B"]
Output: 1 tree (A, depth=3), 1 cycle (X), 2 invalid, 1 duplicate
```

---

## ☁️ Deployment

### Backend → Render

1. Push `backend/` to a **GitHub repository**
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect the repository
4. Set:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node version**: 18+
5. Add **Environment Variables** in Render dashboard:
   ```
   NODE_ENV=production
   USER_ID=yourname_ddmmyyyy
   EMAIL_ID=your@chitkara.edu.in
   COLLEGE_ROLL_NUMBER=yourrollno
   ```
6. Deploy → copy the **Render URL** (e.g. `https://bfhl-api.onrender.com`)

### Frontend → Vercel

1. Push `frontend/` to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
3. Set **Root Directory** to `frontend`
4. Add **Environment Variable**:
   ```
   VITE_API_URL=https://bfhl-api.onrender.com
   ```
5. Deploy → your frontend is live!

---

## 🧾 Postman Collection

Import `postman_collection.json` into Postman.
Set the `baseUrl` variable to `http://localhost:3000` (local) or your Render URL (production).
10 pre-built test cases are included.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js 18+, Express.js 4, CORS, dotenv |
| Frontend | React 18, Vite 5, Tailwind CSS v4 |
| Deployment | Render (backend), Vercel (frontend) |
| Dev tools | nodemon |

---

## 📝 License

MIT — Chitkara University Full Stack Engineering Challenge
# bajaj_full_stack_round_one

# 🛡️ InternShield — Detect Fake Internships Instantly

An AI-powered SaaS tool that analyzes internship listings for scam signals, red flags, and community reports. Paste text or a URL and get a Trust Score in seconds.

---

## 📸 Features

- **Paste Text or URL** — supports direct text input or URL scraping from any job board
- **AI-Powered Analysis** — uses Claude AI to detect pay-to-join schemes, fake companies, vague roles, suspicious contact methods, and more
- **Trust Score (0–100)** — animated circular gauge with verdict: Safe / Suspicious / Scam
- **Red Flag Breakdown** — categorized flags with severity levels (Low / Medium / High)
- **Community Reports** — shows how many students have flagged the same company
- **Actionable Next Steps** — AI-generated steps to protect yourself
- **Animated Mesh Background** — premium dark navy UI with canvas network animation
- **Rate Limited** — 30 analyses per hour per IP to prevent abuse

---

## 🗂️ Project Structure

```
internshield/
├── client/                     # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── api/index.js        # Axios API client
│   │   ├── components/
│   │   │   ├── AnalyzeForm.jsx       # Main input card (Text/URL tabs)
│   │   │   ├── AnalyzingLoader.jsx   # 4-step progress loader
│   │   │   ├── FeatureStrip.jsx      # Bottom 3-feature grid
│   │   │   ├── MeshBackground.jsx    # Animated canvas network
│   │   │   ├── Navbar.jsx            # Top navigation bar
│   │   │   ├── ResultsCard.jsx       # Full results display
│   │   │   └── TrustScoreGauge.jsx   # Circular arc gauge
│   │   ├── pages/
│   │   │   └── Home.jsx              # Main page orchestrator
│   │   ├── App.jsx
│   │   ├── index.css           # Tailwind + custom CSS classes
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
└── server/                     # Node.js + Express + MongoDB backend
    ├── controllers/
    │   ├── analyzeController.js  # Main analysis logic
    │   └── reportsController.js  # Community stats
    ├── models/
    │   └── Analysis.js           # Mongoose schema
    ├── routes/
    │   ├── analyze.js
    │   └── reports.js
    ├── utils/
    │   ├── aiAnalyzer.js         # Claude AI integration
    │   └── scraper.js            # URL scraping with Cheerio
    ├── server.js                 # Express app entry point
    ├── package.json
    └── .env.example
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- Anthropic API Key → [console.anthropic.com](https://console.anthropic.com)

---

### 1. Clone & Install

```bash
# Clone the repo
git clone https://github.com/yourname/internshield.git
cd internshield

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

---

### 2. Environment Variables

```bash
# In /server, copy the example file
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internshield
ANTHROPIC_API_KEY=sk-ant-your-key-here
NODE_ENV=development
```

> **Get your Anthropic API key** at [console.anthropic.com](https://console.anthropic.com/keys)

---

### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# OR use MongoDB Atlas — paste your connection string into MONGODB_URI
```

---

### 4. Run the Backend

```bash
cd server
npm run dev
# Server starts at http://localhost:5000
```

---

### 5. Run the Frontend

```bash
cd client
npm run dev
# Frontend starts at http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analyze` | Submit listing for AI analysis |
| `GET` | `/api/analyze/:id` | Get a previous analysis by ID |
| `GET` | `/api/reports/stats` | Platform-wide statistics |
| `GET` | `/api/reports/company?name=X` | Community report count for a company |
| `GET` | `/api/health` | Health check |

### POST `/api/analyze` — Request Body

```json
{
  "inputType": "text",
  "companyName": "Acme Corp",
  "jobTitle": "Software Engineering Intern",
  "listingText": "We are looking for interns to join our team..."
}
```

```json
{
  "inputType": "url",
  "companyName": "Acme Corp",
  "jobTitle": "Web Developer Intern",
  "listingUrl": "https://example.com/internship-listing"
}
```

### Response

```json
{
  "id": "65f3a...",
  "trustScore": 70,
  "verdict": "suspicious",
  "summary": "This listing shows some concerning patterns...",
  "redFlags": [
    {
      "type": "Vague Job Description",
      "description": "The role responsibilities are poorly defined...",
      "severity": "medium"
    }
  ],
  "actionableSteps": [
    "Request more details from the company before proceeding",
    "Never pay any fees to apply for an internship",
    "..."
  ],
  "communityReportCount": 12,
  "companyName": "Acme Corp",
  "jobTitle": "Software Engineering Intern",
  "analyzedAt": "2026-04-07T10:05:30.000Z"
}
```

---

## 🎨 Design Decisions

| Element | Choice | Reason |
|---------|--------|--------|
| Font | Sora | Geometric, modern, readable — avoids generic Inter |
| Background | Canvas mesh animation | Matches the dynamic network shown in the original UI |
| Color | Navy #050d1a base + blue #3b82f6 accent | Premium SaaS dark theme |
| Cards | Glassmorphism with backdrop-blur | Depth without heaviness |
| Score gauge | SVG arc animation | Visually communicates risk level instantly |
| Verdict colors | Green / Amber / Red | Universal traffic-light semantics |

---

## 🔧 Assumptions Made

1. **PDF Upload** — The video shows "Upload PDF instead" but actual PDF text extraction requires a server-side library (like `pdf-parse`). The current implementation reads the file client-side and prompts the user to paste text. To add full PDF support, install `pdf-parse` on the server and add a `/api/analyze/pdf` endpoint.

2. **Auth** — No login/auth visible in the video. The app is public-access with IP-based rate limiting. JWT auth can be added as a future feature.

3. **URL Scraping** — Cheerio-based scraping works for most public job boards. LinkedIn and some authenticated boards block scrapers. The error message guides users to paste text manually.

4. **AI Model** — Uses `claude-opus-4-5` for best analysis quality. Can be swapped to `claude-haiku-4-5-20251001` for faster/cheaper responses.

---

## 🚀 Production Deployment

```bash
# Build frontend
cd client
npm run build
# Serve /dist via Nginx or a CDN

# Run server with PM2
cd server
npm install -g pm2
pm2 start server.js --name internshield-api
```

Set `NODE_ENV=production` and update the CORS origin in `server.js` to your domain.

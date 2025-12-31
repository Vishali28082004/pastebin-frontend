#  PASTEBIN LITE - FRONTEND README

**Next.js 16 + React 19 + Tailwind CSS v4**



## OVERVIEW

Pastebin Lite Frontend is a modern, responsive web application built with Next.js that allows users to:
- Create text pastes with optional expiry time and view limits
- Share pastes via unique URLs
- View pastes with metadata (expiry time, remaining views)
- Copy and download pastes

**Current Status:**
- Deployed on Vercel
- Fully functional (when backend is working)
- Responsive design


## FEATURES

### Create Paste
- Text input area with character counter
- Optional expiry time (in seconds)
- Optional view limit
- Form validation
- Success/error alerts
- Auto-redirect to paste after creation

### View Paste
- Display paste content
- Show expiry time (if set)
- Show remaining views (if limit set)
- Copy to clipboard button
- Download as file button
- Share URL button
- Warning alerts for expiring pastes

### Design
- Blue-purple gradient background
- Clean white card layout
- Responsive grid design
- Mobile-friendly interface
- Smooth transitions and animations
- Tailwind CSS v4 styling

---

## TECH STACK

**Core Framework:**
- Next.js 16
- React 19
- JavaScript (ES6+)

**Styling:**
- Tailwind CSS v4
- Custom CSS
- Responsive design

**HTTP Client:**
- Axios for API requests
- CORS enabled communication

**Build Tools:**
- npm/yarn
- Vercel deployment

---

## PROJECT STRUCTURE

```
pastebin-frontend/
├── app/
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page (create paste)
│   ├── p/
│   │   └── [id]/
│   │       └── page.js           # View paste page
│   └── globals.css               # Global styles
├── components/
│   └── (future components)
├── lib/
│   └── api.js                    # Axios API client
├── styles/
│   └── (Tailwind config)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .env.local                    # Local environment variables
├── .gitignore
└── README.md
```

---

## SETUP & INSTALLATION

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation Steps

```bash
# 1. Clone the repository
git clone <repository-url>
cd pastebin-frontend

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.example .env.local

# 4. Update environment variables
# Edit .env.local with your backend URL

# 5. Run locally
npm run dev

# 6. Open in browser
# Visit: http://localhost:3000
```

---

## ENVIRONMENT VARIABLES

### Local Development (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Staging Deployment (Vercel Dashboard)

```env
NEXT_PUBLIC_API_URL=https://pastebin-backend-7t5x.vercel.app
```

### Production Deployment (Vercel Dashboard)

```env
NEXT_PUBLIC_API_URL=https://paste-bin-lite-backend-7t5x.vercel.app
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

---

## RUNNING LOCALLY

### Development Mode

```bash
npm run dev
```

- Starts dev server on `http://localhost:3000`
- Hot reload enabled
- Full debugging support

### Production Build

```bash
npm run build
npm start
```

- Optimized production build
- Runs on `http://localhost:3000`

### Deployed URL

https://pastebin-frontend-mauve.vercel.app/
---
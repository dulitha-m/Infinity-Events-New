# INFINITY EVENTS & ENTERTAINMENT — MERN Stack Website

A full-stack cinematic website built with MongoDB, Express, React, and Node.js.

---

## PROJECT STRUCTURE

```
infinity-mern/
├── server/                   # Express + MongoDB backend
│   ├── models/
│   │   ├── Segment.js        # Bento grid segments
│   │   ├── Service.js        # Accordion services
│   │   ├── Client.js         # Hotel & corporate clients
│   │   ├── Highlight.js      # Portfolio highlights
│   │   ├── Stats.js          # Counter stats strip
│   │   ├── Contact.js        # Inquiry submissions
│   │   └── Admin.js          # Admin user (hashed pw)
│   ├── routes/               # REST API routes (all CRUD)
│   ├── middleware/auth.js    # JWT auth guard
│   ├── seed.js               # Auto-seeds all DB data on startup
│   ├── index.js              # Express entry point
│   └── .env                  # Server config (edit this!)
│
├── client/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cursor.js         # Custom animated cursor
│   │   │   ├── Navbar.js         # Sticky nav with scroll effect
│   │   │   ├── Hero.js           # Canvas particles + laser beams
│   │   │   ├── StatsStrip.js     # Animated CountUp stats
│   │   │   ├── About.js          # Split layout about section
│   │   │   ├── Ticker.js         # Scrolling event ticker
│   │   │   ├── Segments.js       # Bento grid (data from API)
│   │   │   ├── Services.js       # Accordion (data from API)
│   │   │   ├── Highlights.js     # Portfolio grid (data from API)
│   │   │   ├── Clients.js        # Tabbed client logos (data from API)
│   │   │   ├── Contact.js        # Inquiry form → POST /api/contact
│   │   │   ├── Footer.js
│   │   │   └── admin/
│   │   │       ├── DashboardHome.js   # Overview + quick stats
│   │   │       ├── InboxPanel.js      # Read/reply/delete inquiries
│   │   │       ├── SegmentsPanel.js   # Full CRUD for segments
│   │   │       ├── ServicesPanel.js   # Full CRUD for services
│   │   │       ├── HighlightsPanel.js # Full CRUD for highlights
│   │   │       ├── ClientsPanel.js    # Full CRUD for clients
│   │   │       ├── StatsPanel.js      # Full CRUD for stats
│   │   │       └── useCrudPanel.js    # Shared CRUD hook
│   │   ├── context/AuthContext.js     # JWT admin auth
│   │   ├── pages/
│   │   │   ├── Home.js               # Public website
│   │   │   ├── AdminLogin.js         # /admin/login
│   │   │   └── AdminDashboard.js     # /admin (protected)
│   │   ├── api.js                    # Axios API service layer
│   │   └── App.js                    # Router + auth guard
│   └── .env
│
└── package.json              # Root: run both servers together
```

---

## QUICK START

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 1. Clone & Install
```bash
# Install all dependencies
npm run install-all
```

### 2. Configure Server
Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/infinity_events
JWT_SECRET=infinity_super_secret_key_2025
CLIENT_URL=http://localhost:3000
ADMIN_EMAIL=admin@infinityeventsint.com
ADMIN_PASSWORD=Admin@Infinity2025
```

> **For MongoDB Atlas:** Replace MONGO_URI with your Atlas connection string.

### 3. Run in Development
```bash
npm run dev
```
This starts both the Express server (port 5000) and React dev server (port 3000) simultaneously.

Or run separately:
```bash
npm run server    # Express on :5000
npm run client    # React on :3000
```

### 4. First Run
On first startup, `seed.js` automatically populates MongoDB with:
- All 7 business segments
- All 6 services  
- All 6 portfolio highlights
- 12 hotel clients + 18 corporate clients
- 5 stats counters
- Admin user account

---

## API ENDPOINTS

### Public (no auth needed)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/segments` | All active segments |
| GET | `/api/services` | All active services |
| GET | `/api/clients?category=hotel` | Clients (filter by category) |
| GET | `/api/highlights` | All highlights |
| GET | `/api/stats` | All stats |
| POST | `/api/contact` | Submit inquiry |
| GET | `/api/health` | Health check |

### Admin (JWT required — Bearer token)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Login → returns JWT token |
| GET | `/api/admin/verify` | Verify token |
| GET | `/api/admin/dashboard` | Overview stats |
| GET | `/api/contact` | All inquiries (paginated) |
| PATCH | `/api/contact/:id/status` | Update inquiry status |
| DELETE | `/api/contact/:id` | Delete inquiry |
| POST/PUT/DELETE | `/api/segments/:id` | CRUD segments |
| POST/PUT/DELETE | `/api/services/:id` | CRUD services |
| POST/PUT/DELETE | `/api/highlights/:id` | CRUD highlights |
| POST/PUT/DELETE | `/api/clients/:id` | CRUD clients |
| POST/PUT/DELETE | `/api/stats/:id` | CRUD stats |

---

## ADMIN PANEL

Visit: `http://localhost:3000/admin/login`

Default credentials:
- **Email:** `admin@infinityeventsint.com`
- **Password:** `Admin@Infinity2025`

**Change these immediately in `server/.env` before deploying!**

### Admin Features
- **Overview** — new inquiry count, recent submissions, quick navigation
- **Inquiries Inbox** — view full messages, filter by status, mark as read/replied, delete
- **Segments** — add/edit/delete bento grid cards with custom colors & gradients
- **Services** — manage accordion service list
- **Highlights** — manage portfolio showcase cards
- **Clients** — manage hotel & corporate client logos
- **Stats** — update the animated counter numbers

---

## DEPLOYMENT

### Backend (Railway / Render / Fly.io)
1. Set environment variables from `server/.env`
2. Deploy `server/` directory
3. MongoDB: use MongoDB Atlas free tier

### Frontend (Vercel / Netlify)
1. Set `REACT_APP_API_URL=https://your-backend-url.com/api`
2. Build: `npm run build` inside `client/`
3. Deploy `client/build/`

---

## TECH STACK

| Layer | Technology |
|-------|-----------|
| Database | MongoDB + Mongoose |
| Backend | Node.js + Express |
| Auth | JWT + bcryptjs |
| Frontend | React 18 |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Animations | CSS animations + Canvas API |
| Notifications | react-hot-toast |
| Counters | react-countup |
| Scroll detection | react-intersection-observer |
| Fonts | Google Fonts (Bebas Neue, Syne, Plus Jakarta Sans) |

---

*Built for Infinity Events & Entertainment Pvt Ltd*

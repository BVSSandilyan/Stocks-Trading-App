# Stocks Trading App — Indian Paper Trading Platform

A full-stack paper trading web application built with React.js, Node.js, Express, and MongoDB. Practice trading on **NSE & BSE** with **₹10,00,000 (10 Lakh)** in virtual funds — covering **316 Indian stocks across 39 sectors**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Recharts |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Market Data | 316 simulated NSE/BSE stocks with live fluctuation |
| Styling | Custom CSS with design tokens |

---

## 📁 Project Structure

```
sb-stocks/
├── backend/                 # Node.js + Express API
│   ├── data/
│   │   └── indianStocks.js  # 316 NSE/BSE stocks, 39 sectors
│   ├── models/               # Mongoose schemas
│   │   ├── User.js           # ₹10L starting virtual balance
│   │   ├── Portfolio.js
│   │   └── Transaction.js
│   ├── routes/                # API endpoints
│   │   ├── auth.js            # /api/auth
│   │   ├── stocks.js          # /api/stocks (paginated, sector/exchange filters)
│   │   ├── portfolio.js       # /api/portfolio
│   │   └── transactions.js    # /api/transactions
│   ├── middleware/
│   │   └── auth.js            # JWT middleware
│   ├── server.js
│   ├── .env                   # MongoDB Atlas URI (pre-configured)
│   └── package.json
│
└── frontend/                  # React.js SPA
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Layout.js
        │   ├── Sidebar.js      # Shows ₹ virtual balance
        │   └── TickerTape.js   # Live-scrolling NSE/BSE ticker
        ├── context/
        │   └── AuthContext.js
        ├── pages/
        │   ├── AuthPage.js     # Login / Register
        │   ├── Dashboard.js    # Home with charts (₹ INR)
        │   ├── Markets.js      # All 316 stocks — sector/exchange filters, pagination
        │   ├── Portfolio.js    # Holdings & P&L
        │   ├── Trade.js        # Buy / Sell with quick-pick symbols
        │   └── History.js      # Transaction log
        ├── styles/
        │   └── globals.css
        ├── utils/
        │   └── format.js
        ├── App.js
        └── index.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (already configured in `backend/.env`)

---

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev     # Development with nodemon
# or
npm start       # Production
```

The API will start at **http://localhost:5000**. On success you'll see:
```
🚀 SB Stocks server running on port 5000
✅ MongoDB Atlas connected successfully
📦 Database: sbstocks
```

> **Important:** Your MongoDB Atlas cluster must allow your IP under **Network Access** (or `0.0.0.0/0` for any IP).

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The React app will start at **http://localhost:3000**

> The frontend proxies `/api` requests to `http://localhost:5000` via the `"proxy"` field in `package.json`.

---

## 🌐 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Stocks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stocks/popular?limit=&offset=&sector=&exchange=` | Paginated stock list with filters |
| GET | `/api/stocks/all` | Full 316-stock list (unpaginated) |
| GET | `/api/stocks/sectors` | List of all 39 sectors with counts |
| GET | `/api/stocks/quote/:symbol` | Live quote for one stock |
| GET | `/api/stocks/search?q=term` | Search by symbol, name, sector, or exchange |
| GET | `/api/stocks/history/:symbol` | 30-day OHLCV history |

### Portfolio
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Get holdings |
| POST | `/api/portfolio/buy` | Buy shares |
| POST | `/api/portfolio/sell` | Sell shares |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Full history |
| GET | `/api/transactions/stats` | Summary stats |

---

## 💡 Features

- ✅ User registration & login with JWT auth
- ✅ ₹10,00,000 virtual starting balance
- ✅ Live-updating NSE/BSE ticker tape (rotating sample of 24 stocks)
- ✅ Dashboard with portfolio performance chart (₹ INR)
- ✅ Markets page — 316 stocks, sector filter (39 sectors), exchange filter (NSE/BSE), search, pagination
- ✅ Trade page — quick-pick popular symbols, live price & 30-day charts
- ✅ Portfolio page — holdings with live P&L and allocation pie chart
- ✅ Transaction history with BUY/SELL filter
- ✅ Dark trading terminal UI design

---

## 🔑 Environment Variables

The `backend/.env` file is pre-configured with MongoDB Atlas. Key variables:

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string (already set) |
| `JWT_SECRET` | Secret key for JWT tokens |
| `PORT` | Backend port (default: 5000) |
| `CLIENT_URL` | Frontend URL for CORS (default: http://localhost:3000) |

---

## 🏗️ Production Build

```bash
# Build frontend
cd frontend && npm run build

# Serve frontend from backend (add to server.js):
# app.use(express.static('frontend/build'))
# app.get('*', (req, res) => res.sendFile('frontend/build/index.html'))
```

---

## 📝 License

MIT — built for educational purposes as a paper trading simulator.

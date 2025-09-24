# 🌱 EcoTrack: Smart Sustainability Score Card

[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Compatible-blue.svg)](https://www.postgresql.org/)
[![Security](https://img.shields.io/badge/Security-Enhanced-green.svg)](https://github.com/yourusername/ecotrack)

A full-stack sustainability platform that helps users track and reduce their carbon footprint through gamification and rewards.

## 🚀 Quick Start

```bash
# Install and run
npm install
npm start

# Open browser
https://ecotracker-b7x4.onrender.com
```

## ✨ Features

- **🧮 Carbon Calculator** - 4-section assessment (4-16 tons CO₂/year)
- **🎮 Weekly Games** - Plant Tracker, Recycle Quest, Energy Saver (+5 pts each)
- **🏆 Rewards Store** - Digital badges (200pts), Stickers (500pts), Products (1000pts)
- **📊 3D Visualizations** - Interactive charts powered by Plotly.js
- **🔧 Admin Panel** - User management, reward processing, analytics
- **🔐 Security** - JWT auth, rate limiting, input validation

## 🛠️ Tech Stack

**Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt  
**Frontend:** HTML5, CSS3, Vanilla JS, Plotly.js, Deployed by Neon

## 📁 Structure

```
SSH/
├── complete-server.js    # Main server
├── index.html           # Landing page
├── login.html           # Authentication
├── dashboard.html       # User dashboard
├── calculator.html      # Carbon calculator
├── rewards.html         # Rewards store
├── admin.html          # Admin panel
├── css/style.css       # Styles
└── js/quiz.js          # Quiz logic
```

## ⚙️ Setup

**Database:** Auto-creates tables on first run

## 🎯 Usage

1. **Register/Login** → **Take Calculator** (+10 pts) → **Play Games** (+5 pts each)
2. **Admin:** `/admin.html` → Manage users & rewards

## 🔒 Security & Accuracy

**Security Fixes Applied:**
- ✅ Code injection prevention (safe DOM methods)
- ✅ SSL certificate validation
- ✅ Input validation middleware
- ✅ Rate limiting (5 attempts/5min)
- ✅ Path traversal protection
- ✅ Timing-safe password comparison

**Carbon Footprint Accuracy:**
- 🟢 **Low Impact (4-7 tons)**: Eco-conscious lifestyle
- 🟡 **Medium Impact (7-12 tons)**: Near global average
- 🔴 **High Impact (12-16+ tons)**: High consumption

**Formula:** `4 + (score-40)/(200-40) * (16-4)` tons CO₂/year

## 🐛 Troubleshooting

- **Port in use**: Change PORT in `.env`
- **Dependencies**: Run `npm install`
- **Admin login**: Default password 
- **Database**: Auto-creates tables on startup

---

**🌐 Server:** https://ecotracker-b7x4.onrender.com | **🔐 Admin:** /admin.html

*Built with 💚 for a sustainable future*

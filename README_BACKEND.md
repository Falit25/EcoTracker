# EcoTrack Backend Setup

## Quick Start

1. **Install Node.js** (if not installed): Download from https://nodejs.org
2. **Run the installer**: Double-click `install.bat` or run:
   ```bash
   npm install
   npm start
   ```
3. **Open browser**: Go to http://localhost:3000

## Features Added

### 🔐 **User Authentication**
- Register/Login system with JWT tokens
- Secure password hashing with bcrypt
- Session persistence across browser sessions

### 🏆 **Reward System**
- **Quiz Completion**: +50 points
- **Daily Actions**:
  - Recycling: +10 points
  - Walking/Biking: +15 points  
  - Energy Saving: +20 points
- **Level System**: Level up every 100 points

### 📊 **User Dashboard**
- Personal profile with points and level
- Recent rewards history
- Global leaderboard
- Quick action buttons for daily tasks

### 💾 **Database**
- SQLite database (no setup required)
- User profiles and authentication
- Quiz results tracking
- Rewards and points history

## API Endpoints

- `POST /api/register` - Create new account
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile
- `POST /api/quiz-result` - Save quiz results (+50 points)
- `POST /api/reward` - Award points for actions
- `GET /api/rewards` - Get user's reward history
- `GET /api/leaderboard` - Global leaderboard

## File Structure

```
├── server.js           # Main backend server
├── package.json        # Dependencies
├── ecotrack.db        # SQLite database (auto-created)
├── login.html         # Authentication page
├── dashboard.html     # User dashboard
└── install.bat        # Quick installer
```

## Usage Flow

1. **Visit**: http://localhost:3000
2. **Register**: Create account via Login/Register button
3. **Dashboard**: Access personal dashboard
4. **Earn Points**: 
   - Complete quiz (+50 points)
   - Log daily eco-actions (+10-20 points)
5. **Track Progress**: View points, level, and leaderboard

The backend integrates seamlessly with your existing frontend - all original features work plus new user accounts and gamification!
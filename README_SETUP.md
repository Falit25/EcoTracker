# EcoTrack Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```
   Or double-click `install.bat`

2. **Start Server**
   ```bash
   npm start
   ```
   Or double-click `start.bat`

3. **Access Website**
   - Main site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin.html
   - Admin password: `admin123`

## Features Fixed

✅ **Complete Backend Integration**
- User registration/login system
- SQLite database for data persistence
- JWT authentication
- File upload for evidence submission
- Admin panel with user management

✅ **Quiz System**
- Points awarded for completion (10 points)
- Results saved to database
- Carbon footprint calculation

✅ **User Dashboard**
- Profile management
- Points and level tracking
- Recent rewards display
- Leaderboard

✅ **Admin Panel**
- User management (view, suspend, delete)
- System statistics
- Secure admin authentication

✅ **File Upload System**
- Evidence submission for eco-activities
- Admin approval workflow
- Secure file storage

## Database Schema

- **users**: User accounts and profiles
- **quiz_results**: Quiz completions and scores
- **rewards**: Points earned by users
- **submissions**: File uploads for review

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Admin role separation
- File upload validation
- SQL injection protection

## Admin Functions

- View all users and their activity
- Suspend/activate user accounts
- Delete users and their data
- Review user submissions
- System statistics dashboard

## Change Admin Password

Edit line 9 in `complete-server.js`:
```javascript
const ADMIN_PASSWORD = 'your_new_password';
```

## File Structure

```
├── complete-server.js    # Main backend server
├── ecotrack.db          # SQLite database (auto-created)
├── uploads/             # User file uploads
├── admin.html           # Admin panel
├── dashboard.html       # User dashboard
├── login.html           # Login/register page
├── submit.html          # Evidence submission
└── js/quiz.js          # Updated quiz with backend integration
```

## Troubleshooting

**Port 3000 in use?**
- Change PORT in `complete-server.js` line 285

**Database issues?**
- Delete `ecotrack.db` to reset

**Dependencies missing?**
- Run `npm install` again

**Admin can't login?**
- Check admin password in `complete-server.js`
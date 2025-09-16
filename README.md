# EcoTrack: The Smart Sustainability Score Card 🌱

A comprehensive full-stack sustainability tracking platform with user authentication, admin panel, and gamification features that helps users measure, understand, and reduce their environmental impact through smart scoring and analytics.

## Features

### 👤 User Authentication & Management
- **User registration and login** with secure password hashing
- **JWT token-based authentication** for secure sessions
- **User profiles** with points, levels, and progress tracking
- **Account suspension/activation** by administrators
- **Session management** with automatic logout on token expiry

### 🎮 Gamification System
- **Points-based rewards** for completing activities
- **Level progression** based on accumulated points
- **Leaderboard** showing top users by points
- **Achievement tracking** with detailed reward history
- **Weekly quiz completion** rewards (10 points per quiz)

### 🔐 Admin Panel
- **Secure admin authentication** with dedicated login
- **User management** - view, suspend, activate, delete users
- **System statistics** - total users, points, quizzes taken
- **User details view** - complete profile, quiz history, rewards
- **Real-time dashboard** with comprehensive analytics

### 📸 Evidence Submission System
- **File upload functionality** for photos/videos
- **Admin review process** for submitted evidence
- **Points allocation** upon admin approval
- **Submission guidelines** for eco-friendly activities
- **Status tracking** (pending, approved, rejected)

### 🧮 Carbon Emission Quiz
- **40-question comprehensive assessment** covering 6 key areas:
  - Energy Consumption (6 questions)
  - Plastic & Waste Management (6 questions)
  - Water Usage (6 questions)
  - Food & Consumption Habits (6 questions)
  - Travel & Mobility (6 questions)
  - Lifestyle & Miscellaneous (10 questions)
- **Smart scoring system** that calculates carbon footprint in tons CO₂/year
- **Database storage** of quiz results and user progress
- **Points reward system** for quiz completion

### 🌍 Global Impact Calculator
- **Calculates global impact** if 8 billion people lived like you
- **Earth capacity analysis** - shows how many Earths we'd need
- **Comparison with global averages** and sustainable targets
- **Interactive visualizations** using HTML5 Canvas
- **Actionable recommendations** based on impact level

### ♻️ Recycling Resources
- **Comprehensive database** of verified recycling websites
- **8 major categories**:
  - Electronics & E-Waste
  - Clothing & Textiles
  - Plastics & Containers
  - Mobile Phones
  - Automotive
  - Household Items
  - Paper & Books
  - International Resources
- **Working links** to legitimate recycling programs
- **Practical recycling tips** and best practices

### 📈 3D Emission Visualization
- **Interactive 3D charts** powered by Plotly.js
- **Multiple visualization types**:
  - 3D scatter plots for sector analysis
  - Pie charts for distribution
  - Bar charts for comparisons
  - Sunburst charts for hierarchical data
  - World map for country emissions
- **Real-time data** on global emissions by sector
- **Historical trends** and country comparisons

### 📱 QR Code Generator
- **Generate QR codes** for easy website access
- **Quick QR generation** for different pages
- **Downloadable QR codes** in PNG format
- **Mobile-friendly** sharing capabilities

## Technology Stack

### **Frontend:**
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript** - Interactive functionality and calculations
- **Plotly.js** - Advanced 3D visualizations and charts
- **QRCode.js** - QR code generation library

### **Backend:**
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing and security
- **Multer** - File upload middleware

### **Database:**
- **SQLite3** - Lightweight relational database
- **Database tables:**
  - `users` - User accounts and profiles
  - `quiz_results` - Quiz submissions and scores
  - `rewards` - Points and achievement tracking
  - `submissions` - File uploads for admin review

### **Security:**
- **Password hashing** with bcrypt (10 rounds)
- **JWT authentication** with secure tokens
- **Admin role separation** with dedicated endpoints
- **File upload validation** and secure storage
- **SQL injection protection** with parameterized queries

## File Structure

```
SSH/
├── Frontend Pages
│   ├── index.html              # Landing page
│   ├── login.html              # User authentication
│   ├── dashboard.html          # User dashboard
│   ├── quiz.html               # Carbon emission quiz
│   ├── impact.html             # Global impact calculator
│   ├── recycle.html            # Recycling resources
│   ├── visualization.html      # 3D visualizations
│   ├── submit.html             # Evidence submission
│   ├── admin.html              # Admin panel
│   └── qr-generator.html       # QR code generator
├── Backend Files
│   ├── complete-server.js      # Main Express server
│   ├── server.js               # Simple HTTP server
│   ├── admin-server.js         # Admin-specific server
│   ├── express-server.js       # Express configuration
│   ├── package.json            # Node.js dependencies
│   ├── package-lock.json       # Dependency lock file
│   └── ecotrack.db             # SQLite database
├── Assets & Styles
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── quiz.js            # Quiz functionality
│   │   ├── impact.js          # Impact calculator
│   │   └── visualization.js   # 3D charts and visualizations
│   ├── assets/
│   │   └── images/            # Image assets
│   └── uploads/               # User file uploads
├── Configuration
│   ├── .env                   # Environment variables
│   ├── start.bat              # Windows startup script
│   ├── install.bat            # Dependency installation
│   └── server.py              # Python server alternative
└── Documentation
    ├── README.md              # Main documentation
    ├── README_BACKEND.md      # Backend setup guide
    └── README_SETUP.md        # Installation instructions
```

## Key Features

### 🎨 Design & UX
- **Mobile-responsive** design that works on all devices
- **Modern gradient backgrounds** and smooth animations
- **Intuitive navigation** between all sections
- **Accessibility-friendly** with proper contrast and semantic HTML
- **Loading animations** and smooth transitions

### 📊 Data & Calculations
- **Science-based calculations** for carbon footprint estimation
- **Real global emission data** from verified sources
- **Accurate country comparisons** and sector breakdowns
- **Sustainable target benchmarks** (2.3 tons CO₂/year per person)

### 🔗 Integration
- **Cross-page data sharing** using localStorage
- **Seamless navigation** between quiz results and impact calculator
- **External resource links** to verified recycling programs
- **Social sharing ready** (can be extended)

## How to Use

### 🚀 Server Setup
1. **Install Node.js** (v14 or higher)
2. **Navigate to project folder:** `cd "e:\VS CODE\SSH"`
3. **Install dependencies:** `npm install`
4. **Start server:** `npm start` or `start.bat`
5. **Access website:** http://localhost:3000

### 👤 User Journey
1. **Register/Login** at http://localhost:3000/login.html
2. **Complete dashboard** to view your profile and stats
3. **Take the quiz** to assess your carbon footprint (earn 10 points)
4. **Submit evidence** of eco-activities for admin approval
5. **View leaderboard** and compete with other users
6. **Calculate global impact** using your quiz results
7. **Explore recycling resources** for your area
8. **Visualize emission data** with interactive 3D charts

### 🔐 Admin Access
1. **Admin panel:** http://localhost:3000/admin.html
2. **Default password:** admin123
3. **Manage users:** View, suspend, activate, delete accounts
4. **Review submissions:** Approve/reject user evidence
5. **View statistics:** Monitor platform usage and engagement

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Full-stack architecture** - Node.js backend with SQLite database
- **Fast loading** - Optimized CSS and JavaScript
- **Secure authentication** - JWT tokens and bcrypt hashing
- **File upload support** - Multer middleware for evidence submission
- **CDN integration** - Plotly.js loaded from CDN for latest features
- **Database optimization** - Indexed queries and efficient schema design

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile

### Quiz & Rewards
- `POST /api/quiz/submit` - Submit quiz results
- `GET /api/rewards` - Get user rewards
- `GET /api/leaderboard` - Get top users

### File Submission
- `POST /api/submit` - Upload evidence files

### Admin Endpoints
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/users` - Get all users
- `GET /api/admin/user/:id` - Get user details
- `DELETE /api/admin/user/:id` - Delete user
- `PUT /api/admin/user/:id/suspend` - Suspend/activate user

## Customization

### Adding New Quiz Questions
Edit `js/quiz.js` and add questions to the `questions` array:

```javascript
{
    question: "Your question here?",
    options: [
        { text: "Option A", score: 1 },
        { text: "Option B", score: 2 },
        // ... more options
    ]
}
```

### Updating Admin Password
Modify `complete-server.js`:

```javascript
const ADMIN_PASSWORD = 'your-new-password';
```

### Adding New Database Tables
Add table creation in `complete-server.js`:

```javascript
db.run(`CREATE TABLE IF NOT EXISTS new_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    // ... your columns
)`);
```

## Future Enhancements

- 🔄 **Real-time data integration** with environmental APIs
- 📱 **Progressive Web App** (PWA) capabilities
- 🌐 **Multi-language support**
- 📊 **Advanced analytics** dashboard for admins
- 🤝 **Social features** for sharing and challenges
- 🎯 **Enhanced gamification** with badges and achievements
- 📧 **Email notifications** for rewards and updates
- 🗺️ **Location-based** recycling center finder
- 💳 **Payment integration** for carbon offset purchases
- 🔔 **Push notifications** for quiz reminders
- 📈 **Data export** functionality for users
- 🔐 **OAuth integration** (Google, Facebook login)
- 🌟 **Team challenges** and group competitions

## Contributing

This is a hackathon project designed to raise sustainability awareness. Feel free to:

1. **Fork the repository**
2. **Add new features** or improve existing ones
3. **Update data** with more recent information
4. **Enhance visualizations** with new chart types
5. **Improve accessibility** and mobile experience

## Security Features

- **Password hashing** with bcrypt (10 salt rounds)
- **JWT token authentication** with expiration
- **Admin role separation** with secure endpoints
- **File upload validation** and size limits
- **SQL injection prevention** with parameterized queries
- **Session management** with automatic logout
- **Input sanitization** on all user inputs

## Data Sources

- Global emission data from IPCC reports
- Country emission data from Global Carbon Atlas
- Recycling resources verified as of 2024
- Carbon footprint calculations based on EPA guidelines

## Troubleshooting

### Server Won't Start
- Ensure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 3000 is available
- Run: `node complete-server.js`

### Database Issues
- Delete `ecotrack.db` to reset database
- Restart server to recreate tables
- Check file permissions in project folder

### File Upload Problems
- Ensure `uploads/` folder exists
- Check file size limits (default: 10MB)
- Verify file types are allowed (images/videos)

## License

This project is open source and available under the MIT License.

---

**Built with 💚 for a sustainable future**

*EcoTrack - Your Smart Sustainability Score Card*

**Server:** http://localhost:3000  
**Admin Panel:** http://localhost:3000/admin.html  
**Default Admin Password:** admin123
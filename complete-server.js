const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Create uploads directory
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.static('.'));
app.use('/uploads', express.static(uploadsDir));

// Multer setup
const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Database connection
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database
const initDB = async () => {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT UNIQUE,
            email TEXT UNIQUE,
            password TEXT,
            points INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            suspended INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS quiz_results (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            score INTEGER,
            carbon_footprint REAL,
            answers TEXT,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS rewards (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            points INTEGER,
            description TEXT,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS submissions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            filename TEXT,
            description TEXT,
            status TEXT DEFAULT 'pending',
            points INTEGER DEFAULT 0,
            submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            reviewed_at TIMESTAMP
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS available_rewards (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            points_required INTEGER NOT NULL,
            category TEXT NOT NULL,
            type TEXT DEFAULT 'physical',
            stock INTEGER DEFAULT -1,
            active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);

        await db.query(`CREATE TABLE IF NOT EXISTS reward_claims (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            reward_id INTEGER REFERENCES available_rewards(id),
            status TEXT DEFAULT 'pending',
            shipping_info TEXT,
            claimed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            reviewed_at TIMESTAMP
        )`);

        // Insert default rewards if table is empty
        const rewardCount = await db.query('SELECT COUNT(*) FROM available_rewards');
        if (parseInt(rewardCount.rows[0].count) === 0) {
            const defaultRewards = [
                ['Nature Caretaker Badge', 'Digital badge displayed on your profile', 200, 'badge', 'digital'],
                ['Eco Warrior Badge', 'Digital badge for environmental champions', 200, 'badge', 'digital'],
                ['Carbon Reducer Badge', 'Badge for reducing carbon footprint', 200, 'badge', 'digital'],
                ['Green Champion Badge', 'Badge for sustainability leadership', 200, 'badge', 'digital'],
                ['Sustainability Star Badge', 'Badge for consistent eco-friendly actions', 200, 'badge', 'digital'],
                ['Recycling Symbol Stickers', 'Pack of 20 eco-friendly stickers', 500, 'stickers', 'physical'],
                ['Save the Planet Stickers', 'Motivational environmental stickers', 500, 'stickers', 'physical'],
                ['Solar Energy Stickers', 'Renewable energy themed stickers', 500, 'stickers', 'physical'],
                ['Wildlife Protection Stickers', 'Animal conservation stickers', 500, 'stickers', 'physical'],
                ['Water Conservation Stickers', 'Water saving awareness stickers', 500, 'stickers', 'physical'],
                ['Reusable Vegetable Bags', 'Set of 3 eco-friendly grocery bags', 1000, 'bags', 'physical'],
                ['Bamboo Utensil Set', 'Fork, spoon, knife, chopsticks set', 1000, 'utensils', 'physical'],
                ['Stainless Steel Water Bottle', 'Durable reusable water bottle', 1000, 'bottle', 'physical'],
                ['Seed Packets for Gardening', 'Organic vegetable and herb seeds', 1000, 'seeds', 'physical'],
                ['Beeswax Food Wraps', 'Set of 3 sizes for food storage', 1000, 'wraps', 'physical']
            ];
            
            for (const reward of defaultRewards) {
                await db.query(
                    'INSERT INTO available_rewards (name, description, points_required, category, type) VALUES ($1, $2, $3, $4, $5)',
                    reward
                );
            }
        }
        
        console.log('Database initialized');
    } catch (err) {
        console.error('Database init error:', err);
    }
};

// Auth middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Routes
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await db.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
            [username, email, hashedPassword]
        );
        
        const userId = result.rows[0].id;
        const token = jwt.sign({ id: userId, username }, JWT_SECRET);
        
        res.json({ 
            token, 
            user: { id: userId, username, email, points: 0, level: 1 }
        });
    } catch (error) {
        res.status(400).json({ error: 'Username or email already exists' });
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        if (user.suspended) {
            return res.status(403).json({ error: 'Account suspended' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Password mismatch for user:', username);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email, 
                points: user.points, 
                level: user.level 
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT id, username, email, points, level FROM users WHERE id = $1',
            [req.user.id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load profile' });
    }
});

app.post('/api/quiz/submit', authenticateToken, async (req, res) => {
    const { score, carbonFootprint, answers } = req.body;
    const points = 10;
    
    try {
        await db.query('BEGIN');
        
        await db.query(
            'INSERT INTO quiz_results (user_id, score, carbon_footprint, answers) VALUES ($1, $2, $3, $4)',
            [req.user.id, score, carbonFootprint, JSON.stringify(answers)]
        );
        
        await db.query(
            'UPDATE users SET points = points + $1 WHERE id = $2',
            [points, req.user.id]
        );
        
        await db.query(
            'INSERT INTO rewards (user_id, points, description) VALUES ($1, $2, $3)',
            [req.user.id, points, 'Completed carbon footprint quiz']
        );
        
        await db.query('COMMIT');
        res.json({ success: true, points });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Quiz submission failed' });
    }
});

app.get('/api/rewards', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM rewards WHERE user_id = $1 ORDER BY earned_at DESC LIMIT 10',
            [req.user.id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load rewards' });
    }
});

app.get('/api/leaderboard', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT username, points, level FROM users WHERE suspended = 0 ORDER BY points DESC LIMIT 10'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load leaderboard' });
    }
});

app.post('/api/submit', authenticateToken, upload.single('file'), async (req, res) => {
    const { description } = req.body;
    const filename = req.file ? req.file.filename : null;
    
    if (!filename) {
        return res.status(400).json({ error: 'File required' });
    }
    
    try {
        const result = await db.query(
            'INSERT INTO submissions (user_id, filename, description) VALUES ($1, $2, $3) RETURNING id',
            [req.user.id, filename, description]
        );
        res.json({ success: true, id: result.rows[0].id });
    } catch (error) {
        res.status(500).json({ error: 'Submission failed' });
    }
});

// Admin routes
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
        const token = jwt.sign({ admin: true }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid admin password' });
    }
});

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err || !decoded.admin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    });
};

// Rewards routes
app.get('/api/rewards/catalog', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM available_rewards WHERE active = true ORDER BY points_required ASC'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load rewards catalog' });
    }
});

app.post('/api/rewards/claim', authenticateToken, async (req, res) => {
    const { rewardId, shippingInfo } = req.body;
    
    try {
        await db.query('BEGIN');
        
        // Get reward details
        const rewardResult = await db.query(
            'SELECT * FROM available_rewards WHERE id = $1 AND active = true',
            [rewardId]
        );
        
        if (rewardResult.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ error: 'Reward not found' });
        }
        
        const reward = rewardResult.rows[0];
        
        // Get user points
        const userResult = await db.query(
            'SELECT points FROM users WHERE id = $1',
            [req.user.id]
        );
        
        const userPoints = userResult.rows[0].points;
        
        if (userPoints < reward.points_required) {
            await db.query('ROLLBACK');
            return res.status(400).json({ error: 'Insufficient points' });
        }
        
        // Deduct points
        await db.query(
            'UPDATE users SET points = points - $1 WHERE id = $2',
            [reward.points_required, req.user.id]
        );
        
        // Create claim
        await db.query(
            'INSERT INTO reward_claims (user_id, reward_id, shipping_info) VALUES ($1, $2, $3)',
            [req.user.id, rewardId, shippingInfo]
        );
        
        await db.query('COMMIT');
        res.json({ success: true, pointsDeducted: reward.points_required });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to claim reward' });
    }
});

app.get('/api/rewards/claims', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT rc.*, ar.name, ar.description, ar.points_required
            FROM reward_claims rc
            JOIN available_rewards ar ON rc.reward_id = ar.id
            WHERE rc.user_id = $1
            ORDER BY rc.claimed_at DESC
        `, [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load claims' });
    }
});

app.get('/api/admin/users', authenticateAdmin, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT u.*, COUNT(qr.id) as quiz_count
            FROM users u 
            LEFT JOIN quiz_results qr ON u.id = qr.user_id 
            GROUP BY u.id 
            ORDER BY u.created_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load users' });
    }
});

app.get('/api/admin/submissions', authenticateAdmin, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT s.*, u.username
            FROM submissions s
            JOIN users u ON s.user_id = u.id
            ORDER BY s.submitted_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load submissions' });
    }
});

app.put('/api/admin/submission/:id/approve', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const { points } = req.body;
    
    try {
        await db.query('BEGIN');
        
        // Get submission details
        const submissionResult = await db.query(
            'SELECT user_id FROM submissions WHERE id = $1',
            [id]
        );
        
        if (submissionResult.rows.length === 0) {
            await db.query('ROLLBACK');
            return res.status(404).json({ error: 'Submission not found' });
        }
        
        const userId = submissionResult.rows[0].user_id;
        
        // Update submission status and points
        await db.query(
            'UPDATE submissions SET status = $1, points = $2, reviewed_at = CURRENT_TIMESTAMP WHERE id = $3',
            ['approved', points, id]
        );
        
        // Add points to user
        await db.query(
            'UPDATE users SET points = points + $1 WHERE id = $2',
            [points, userId]
        );
        
        // Add reward record
        await db.query(
            'INSERT INTO rewards (user_id, points, description) VALUES ($1, $2, $3)',
            [userId, points, 'Evidence submission approved']
        );
        
        await db.query('COMMIT');
        res.json({ success: true });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to approve submission' });
    }
});

app.put('/api/admin/submission/:id/reject', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query(
            'UPDATE submissions SET status = $1, reviewed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['rejected', id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject submission' });
    }
});

app.get('/api/admin/user/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        const userResult = await db.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        
        const quizzesResult = await db.query(
            'SELECT * FROM quiz_results WHERE user_id = $1 ORDER BY completed_at DESC',
            [id]
        );
        
        const rewardsResult = await db.query(
            'SELECT * FROM rewards WHERE user_id = $1 ORDER BY earned_at DESC',
            [id]
        );
        
        res.json({
            user: userResult.rows[0],
            quizzes: quizzesResult.rows,
            rewards: rewardsResult.rows
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load user details' });
    }
});

app.delete('/api/admin/user/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

app.put('/api/admin/user/:id/suspend', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    const { suspended } = req.body;
    
    try {
        await db.query(
            'UPDATE users SET suspended = $1 WHERE id = $2',
            [suspended ? 1 : 0, id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user status' });
    }
});

app.get('/api/admin/reward-claims', authenticateAdmin, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT rc.*, u.username, u.email, ar.name as reward_name, ar.description, ar.points_required
            FROM reward_claims rc
            JOIN users u ON rc.user_id = u.id
            JOIN available_rewards ar ON rc.reward_id = ar.id
            ORDER BY rc.claimed_at DESC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load reward claims' });
    }
});

app.put('/api/admin/reward-claim/:id/approve', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query(
            'UPDATE reward_claims SET status = $1, reviewed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['approved', id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve claim' });
    }
});

app.put('/api/admin/reward-claim/:id/ship', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query(
            'UPDATE reward_claims SET status = $1, reviewed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['shipped', id]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark as shipped' });
    }
});

app.put('/api/admin/reward-claim/:id/reject', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    
    try {
        await db.query('BEGIN');
        
        // Get claim details
        const claimResult = await db.query(`
            SELECT rc.user_id, ar.points_required
            FROM reward_claims rc
            JOIN available_rewards ar ON rc.reward_id = ar.id
            WHERE rc.id = $1
        `, [id]);
        
        if (claimResult.rows.length > 0) {
            const { user_id, points_required } = claimResult.rows[0];
            
            // Refund points
            await db.query(
                'UPDATE users SET points = points + $1 WHERE id = $2',
                [points_required, user_id]
            );
        }
        
        // Update claim status
        await db.query(
            'UPDATE reward_claims SET status = $1, reviewed_at = CURRENT_TIMESTAMP WHERE id = $2',
            ['rejected', id]
        );
        
        await db.query('COMMIT');
        res.json({ success: true });
    } catch (error) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: 'Failed to reject claim' });
    }
});

const PORT = process.env.PORT || 3000;

// Start server after DB init
initDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`EcoTrack server running on port ${PORT}`);
        console.log(`Admin password: ${ADMIN_PASSWORD}`);
    });
});

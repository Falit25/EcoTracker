const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('.'));

// Admin password - CHANGE THIS
const ADMIN_PASSWORD = '12345678';

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    
    if (password === ADMIN_PASSWORD) {
        res.json({ token: 'admin-token-' + Date.now() });
    } else {
        res.status(401).json({ error: 'Invalid password' });
    }
});

// Mock endpoints for admin panel
app.get('/api/admin/users', (req, res) => {
    res.json([]);
});

app.listen(3000, () => console.log('Server with admin auth running at http://localhost:3000'));
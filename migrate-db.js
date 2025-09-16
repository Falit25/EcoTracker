const fs = require('fs');
const path = require('path');
const os = require('os');

// Paths
const oldDbPath = 'ecotrack.db';
const newDbDir = path.join(os.homedir(), 'ecotrack-data');
const newDbPath = path.join(newDbDir, 'ecotrack.db');

// Create new directory
if (!fs.existsSync(newDbDir)) {
    fs.mkdirSync(newDbDir, { recursive: true });
    console.log('Created directory:', newDbDir);
}

// Move existing database if it exists
if (fs.existsSync(oldDbPath)) {
    fs.copyFileSync(oldDbPath, newDbPath);
    console.log('Database migrated from:', oldDbPath);
    console.log('Database migrated to:', newDbPath);
    console.log('You can now safely delete the old ecotrack.db file');
} else {
    console.log('No existing database found to migrate');
}

console.log('Migration complete!');
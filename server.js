const express = require('express');
const cors = require('cors'); // The security bypass!

const app = express();

// Allow React to talk to this server
app.use(cors());
app.use(express.json());

// This variable holds the live number in memory
let liveCount = 0;

// --- DOOR 1: FOR THE ESP32 ---
app.post('/update-count', (req, res) => {
    if (req.body && req.body.count !== undefined) {
        liveCount = req.body.count;
        console.log(`📡 ESP32 updated the count to: ${liveCount}`);
        res.status(200).send('Data received');
    } else {
        res.status(400).send('Invalid data');
    }
});

// --- DOOR 2: FOR THE REACT DASHBOARD ---
app.get('/count', (req, res) => {
    // React hits this URL every 2 seconds to get the latest number
    res.json({ count: liveCount });
});

// Listen on all network interfaces
app.listen(5000, '0.0.0.0', () => {
    console.log('✅ Canteen Backend is running on port 5000');
});
const express = require('express');
const cors = require('cors'); 

const app = express();

app.use(cors());
app.use(express.json());

let liveCount = 0;

app.post('/update-count', (req, res) => {
    if (req.body && req.body.count !== undefined) {
        liveCount = req.body.count;
        console.log(`📡 ESP32 updated the count to: ${liveCount}`);
        res.status(200).send('Data received');
    } else {
        res.status(400).send('Invalid data');
    }
});

app.get('/count', (req, res) => {
    res.json({ count: liveCount });
});

// 🔥 THE CLOUD PORT FIX 🔥
// This tells the server to use Render's cloud port, OR 5000 if running locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Canteen Backend is running on port ${PORT}`);
});
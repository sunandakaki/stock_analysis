// routes/predictRoute.js

const express = require('express');
const router = express.Router();
const StockPrediction = require('../models/StockPrediction'); // Adjust the path as necessary

router.get('/predict', async (req, res) => {
    try {
        const latestPrediction = await StockPrediction.findOne().sort({ createdAt: -1 });
        res.json(latestPrediction);
    } catch (error) {
        console.error('Error fetching prediction:', error);
        res.status(500).send('Error fetching prediction');
    }
});

module.exports = router;

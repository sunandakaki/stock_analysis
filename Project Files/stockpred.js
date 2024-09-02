// models/StockPrediction.js

const mongoose = require('mongoose');

const StockPredictionSchema = new mongoose.Schema({
    predictions: [{
        stockSymbol: String, // Symbol of the stock
        predictedPrice: Number, // Predicted price of the stock
    }],
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets to the current date and time
    }
});

module.exports = mongoose.model('StockPrediction', StockPredictionSchema);

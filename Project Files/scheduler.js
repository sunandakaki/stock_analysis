// code to schedule and run Python script daily.

// scheduler.js

const cron = require('node-cron');
const { spawn } = require('child_process');
const StockPrediction = require('./models/StockPrediction'); // Adjust the path as necessary

const schedulePredictions = () => {
    cron.schedule('0 0 * * *', () => { // Runs at midnight every day
        const pythonProcess = spawn('python', ['path_to_your_python_script.py']);

        pythonProcess.stdout.on('data', async (data) => {
            const prediction = JSON.parse(data);
            const newPrediction = new StockPrediction({ predictions: prediction });
            await newPrediction.save();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
    });
};

module.exports = schedulePredictions;



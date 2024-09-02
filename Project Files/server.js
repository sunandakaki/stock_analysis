const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017"; // This is the default URI for local MongoDB installation
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    // You can perform actions on the database here
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/stocks/:ticker', async (req, res) => {
    try {
      await client.connect();
      const ticker = req.params.ticker.toUpperCase();
      const collection = client.db("proj_test").collection("stocks");
      const stock = await collection.findOne({ ticker: ticker });
      res.json(stock);
    } catch (e) {
      console.error(e);
      res.status(500).send('Internal Server Error');
    } finally {
      await client.close();
    }
  });

  app.use(express.static('public'));


// server.js or app.js

const connectDB = require('./db'); // Import the connectDB function

connectDB(); // Connect to MongoDB

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

const schedulePredictions = require('./scheduler'); 
const predictRoute = require('./routes/predictRoute');

connectDB();
schedulePredictions(); // Initialize the cron job

app.use('/api', predictRoute);

  
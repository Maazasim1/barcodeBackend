// src/index.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { uploadToMongo } = require('./utils/uploadToMongo');
const { searchGtin } = require('./controllers/searchGtin');

dotenv.config();
const port = process.env.PORT;

const app = express();

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`Connected to MongoDB Database`);
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.get('/', (req, res) => {
  res.send("spinning up serverless functions")
})

app.get('/uploadToDatabase', async (req, res) => {
  await uploadToMongo();
  res.send('all files have been uploaded to the database');
});

app.get('/searchGtin/:gtin', async (req, res) => {
  const gtin = req.params.gtin;
  const result = await searchGtin(gtin);
  if (result === "gtin not found") {
    return res.status(200).json({ "error": "gtin not found" })
  }
  else {
    return res.send(result)
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
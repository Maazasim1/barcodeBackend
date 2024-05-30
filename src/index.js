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


app.get('/',(req,res)=>{
    res.send("spinning up serverless functions")
})

app.get('/uploadToDatabase', async (req, res) => {
    await uploadToMongo();
  res.send('Express + TypeScript Server');
});

app.get('/searchGtin/:gtin',async (req,res)=>{
    const gtin=req.params.gtin;
    const result= await searchGtin(gtin);
    res.send(result)
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
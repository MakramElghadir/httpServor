require("dotenv").config();
const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors'); // Import cors package
const app = express();
app.use(express.json());
const { getMessages, addMessage } = require('./database.js');
const path = require('path');

const APIKEY = "123456";

// Enable CORS for all origins (adjust as needed)
app.use(cors({
  origin: 'https://dev4.cyberbunny.online:3000'  // Replace with your actual frontend domain
}));


// Default route
app.get('/', (req, res) => {
  res.send('Bienvenido');
});

// Route for fetching messages
app.get('/message', (req, res) => {
  const apikey = req.headers['apikey'];
  if (apikey !== APIKEY) {
    return res.status(401).send('Unauthorized');
  } else if (apikey === APIKEY) {
    res.json(getMessages());
    return res.status(200).send('OK');
  }
});

// Route for posting messages
app.post('/message', (req, res) => {
  const apikey = req.headers['apikey'];
  if (apikey !== APIKEY) {
    return res.status(401).send('Unauthorized');
  }

  const message = req.body.message;
  if (message) {
    addMessage(message);
    res.status(201).send('Message added');
  } else {
    res.status(400).send('Bad Request');
  }
});

// Start HTTPS or HTTP server
if (process.env.NODE_ENV === 'productiondev') {
  const options = {
    key: fs.readFileSync(path.join(__dirname, 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'fullchain.pem'))
  };
  
  https.createServer(options, app).listen(3000, () => {
    console.log('Server started on https://dev4.cyberbunny.online:3000');
  });
} else {
  http.createServer(app).listen(3000, () => {
    console.log('Server started on http://dev4.cyberbunny.online:3000');
  });
}

// Import the express library
const express = require('express');

// Create an instance of express app
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Set the server to listen on a port
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

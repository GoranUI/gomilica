const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
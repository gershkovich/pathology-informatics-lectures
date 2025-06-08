const express = require('express');
const path = require('path');
const app = express();
const port = 8000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve node_modules files
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Route for the home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for processing text input
app.post('/api/process-text', (req, res) => {
  const { text } = req.body;

  // Check if text contains special characters ($ or #)
  const hasSpecialChars = /[$#]/.test(text);

  if (hasSpecialChars) {
    // Return error response
    res.json({
      success: false,
      message: 'Input contains special characters ($ or #)',
      processedText: text
    });
  } else {
    // Return success response
    res.json({
      success: true,
      message: 'Input processed successfully',
      processedText: text
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Presentation server running at http://localhost:${port}`);
});

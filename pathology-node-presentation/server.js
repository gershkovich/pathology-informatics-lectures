const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname, { index: false }));

// Serve node_modules files
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Landing page — lecture selector
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

// Route for JSON-driven lectures (friendly URL → lecture.html with query param)
app.get('/lecture/:name', (req, res) => {
  res.redirect('/lecture.html?lecture=' + encodeURIComponent(req.params.name));
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

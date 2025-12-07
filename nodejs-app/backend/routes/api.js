const express = require('express');
const router = express.Router();

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// GET /api/data
router.get('/data', async (req, res) => {
  try {
    // Example data
    const data = {
      message: 'Sample data from API',
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ]
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/data
router.post('/data', async (req, res) => {
  try {
    const { body } = req;
    // Save data logic here
    res.json({ 
      success: true, 
      message: 'Data received',
      data: body 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;



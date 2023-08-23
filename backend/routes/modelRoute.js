const express = require('express');
const router = express.Router();
const tf = require('@tensorflow/tfjs');
const bodyParser = require('body-parser');
const axios = require('axios');

const { createCanvas, loadImage } = require('canvas');

// Define an async function to load the model
const loadModel = async () => {
  return await tf.loadLayersModel('/processFrame');
};

router.use(bodyParser.json()); // Use body-parser middleware

router.post('/process_stream', async (req, res) => {
  try {
    const { frame } = req.body;
    const response = await axios.post('http://127.0.0.1:5000/process_stream', { frame });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the image.' });
  }
});



module.exports = router;
const express = require('express');
const { sendMessage } = require('../controller/messageController');

const router = express.Router();

// Define your route
router.post('/send', sendMessage);

module.exports = router;

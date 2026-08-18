const express = require('express');
const router = express.Router();
const { createTweet } = require('../../controllers/tweet-controller');

router.post('/tweets', createTweet);

module.exports = router;
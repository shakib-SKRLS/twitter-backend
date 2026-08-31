const express = require('express');
const router = express.Router();
const { createTweet } = require('../../controllers/tweet-controller');
const { toggleLike } = require('../../controllers/like_controller');

router.post('/likes/toggle', toggleLike);
router.post('/tweets', createTweet);

module.exports = router;
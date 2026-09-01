const express = require('express');
const router = express.Router();
const { createTweet } = require('../../controllers/tweet-controller');
const { toggleLike } = require('../../controllers/like-controller');
const { createComment } = require('../../controllers/comment-controller');
router.post('/likes/toggle', toggleLike);
router.post('/tweets', createTweet);
router.post('/comments', createComment);

module.exports = router;
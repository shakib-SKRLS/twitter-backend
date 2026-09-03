const express = require('express');
const router = express.Router();
const { createTweet } = require('../../controllers/tweet-controller');
const { toggleLike } = require('../../controllers/like-controller');
const { createComment } = require('../../controllers/comment-controller');
const { signUp, login } = require('../../controllers/auth-controller');

const  authenticate  = require('../../middleware/authenticate');

router.post('/signup', signUp);
router.post('/login', login);

router.post('/likes/toggle', toggleLike);
router.post('/tweets', authenticate, createTweet);
router.post('/comments', authenticate, createComment);


module.exports = router;
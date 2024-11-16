const express = require('express');
const tweetController = require('../controllers/tweet');

const router = express();
router.post('/tweet', tweetController.tweet);

module.exports = router;
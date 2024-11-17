import express from 'express';
import TweetController from '../controllers/TweetController.js';

const router = express();
router.post('/tweet', (req, res, next) => TweetController.tweet(req, res, next));


export default router;
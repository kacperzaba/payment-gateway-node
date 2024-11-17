import ApiError from '../error/ApiError.js';

class TweetController {
  tweet(req, res, next) {
    const { msg } = req.body;
    if (!msg) {
      next(ApiError.badRequest('msg field is required and must be non blank'));
      return;
    }
    res.sendStatus(201);
  }
}

export default new TweetController();
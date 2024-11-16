const ApiError = require("./ApiError");
const logger = require('../logger');

function apiErrorHandler(err, req, res, next) {
    logger.error(err);

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('something went wrong');
}

module.exports = apiErrorHandler;
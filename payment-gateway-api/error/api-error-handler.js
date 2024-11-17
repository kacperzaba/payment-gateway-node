import ApiError from "./ApiError.js";
import logger from '../logger/winstonLogger.js';

function apiErrorHandler(err, req, res, next) {
    logger.error(err);

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        return;
    }

    res.status(500).json('something went wrong');
}

export default apiErrorHandler;
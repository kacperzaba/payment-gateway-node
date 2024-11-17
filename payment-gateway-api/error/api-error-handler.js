import ApiError from "./ApiError.js";
import logger from '../logger/winstonLogger.js';

function apiErrorHandler(err, req, res, next) {

    if (err instanceof ApiError) {
        res.status(err.code).json(err.message);
        logger.error(err);
        return;
    }

    res.status(500).json('something went wrong');
}

export default apiErrorHandler;
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg) {
        return new ApiError(400, msg);
    }

    static customError(code, msg) {
        return new ApiError(code, msg);
    }

    static internal(msg) {
        return new ApiError(500, msg);
    }
}

module.exports = ApiError;
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

    static dbConnectionError() {
        return new ApiError(500, 'Database connection failed');
    }

    static internal(msg) {
        return new ApiError(500, msg);
    }
}

export default ApiError;
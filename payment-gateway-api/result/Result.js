class Result {
    static ApiResult(res, statusCode, data) {
      return res.status(statusCode).json({ data });
    }
  }
  
  export default Result;
  
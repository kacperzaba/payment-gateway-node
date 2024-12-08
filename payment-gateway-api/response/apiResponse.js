export const apiResponse = {
    response: (res, statusCode, data) => {
        return res.status(statusCode).json({
            data: data
        })
    }    
}
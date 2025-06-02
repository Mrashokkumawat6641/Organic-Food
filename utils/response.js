export const successResponse = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        data,
        error: [],
        responseCode: statusCode,
    });
};

export const errorResponse = (res, errors, statusCode = 400) => {
    return res.status(statusCode).json({
        data: {},
        error: Array.isArray(errors) ? errors : [errors],
        responseCode: statusCode,
    });
};

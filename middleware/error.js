const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // Wrong id Mongo db errorr casteError

    if (err.name === 'castError') {
        const message = `Resourse not found. Indivalid ${err.path}`;
        err = new ErrorHandler(message, 400)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}




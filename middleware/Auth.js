const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");

exports.isAuthenticatedUsers = catchAsyncError(async (req, res, next) => {
    let { token } = req.cookies;
    // Check if token exists in cookies
    // if (req.cookies.token) {
    //     token = req.cookies.token;
    // }
    // If token is not found in cookies
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    try {
        // Verify token
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        // Find user by decoded token's id
        req.user = await User.findById(decodedData._id);
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roles)) {
            return next(new ErrorHandler(`Role: {req.user.roles} is not allwed to access this resouce`, 403)
            )
        }
        next();
    };
}
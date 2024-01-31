const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/UserModels");
const JWT = require('jsonwebtoken');
const SendToken = require("../utils/jwtToken");

//Register a User 

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    });

    SendToken(user, 201, res);
    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     user,
    //     token
    // })
})

// Lgin User

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and email both
    const user = await User.findOne({ email }).select("+password");

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & password", 400));
    }
    if (!user) {
        return next(new ErrorHandler("Invalid email or password "))
    }

    const isPasswordMatched = await user.getJWTToken(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password"));
    }

    SendToken(user, 200, res);
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success: true,
    //     token,
    // })

})

// Logout USer 

exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        succes: true,
        message: "logged Out"
    })
})


// forgot Password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Get ResetPassword Token
    const resetToken = user.gernerateResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `your password  reset token is : \n\n ${resetPasswordUr} \n\n if you have not requested this email then , Please ignore it`
})

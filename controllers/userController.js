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



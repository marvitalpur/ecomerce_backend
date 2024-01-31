const SendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookies
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    // Setting the status code
    res.statusCode = statusCode;

    // Setting the cookie and sending JSON response
    res.cookie('token', token, options).json({
        success: true,
        user,
        token
    });
}

module.exports = SendToken;
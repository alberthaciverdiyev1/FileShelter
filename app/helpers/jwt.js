const jwt = require('jsonwebtoken');

exports.tokenCheck = (req, res, next) => {
    const accessToken = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.auth = decoded;
        // console.log({ decoded });
        next();
    } catch (accessTokenError) {
        if (!refreshToken) {
            return res.redirect('/login');
        }
    }
};

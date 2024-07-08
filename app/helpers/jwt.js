const jwt = require('jsonwebtoken');

exports.tokenCheck = (req, res, next) => {
    const token = req.cookies.token;
    console.log({ token: token });

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = decoded;
        next();
    } catch (ex) {
        return res.redirect('/login');
    }
};

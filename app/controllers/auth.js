const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

exports.registerView = (req, res) => {
  res.render('auth/register',)

};

exports.loginView = (req, res) => {
  res.render('auth/login', { js: "auth/login.js" })
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const response = await authService.registerUser(username, email, password);
    return response;

    // if (response.status === 201) {
    //   const payload = {
    //     user: {
    //       id: res.user.id
    //     }
    //   };
    //   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
    //     if (err) throw err;
    //     res.json({ staus:response.status, token });
    //   });
    // }else{
    //   res.status(response.status).send(response.message);
    // }
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
};




exports.login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
  try {
    const data = await authService.loginUser(email, password);
    res.clearCookie('refreshToken');
    res.clearCookie('token');

    if (data.status === 200) {
      res.cookie('token', data.token, {
        httpOnly: true,
        secure: process.env.IS_PRODUCTION,
        sameSite: 'Strict',
        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000
      });

      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.IS_PRODUCTION,
        sameSite: 'Strict',
        maxAge: rememberMe ? 15 * 24 * 60 * 60 * 1000 : 15 * 60 * 1000
      });

      res.status(data.status).json({ message: data.message });
    } else {
      res.status(data.status).json({ message: data.message });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

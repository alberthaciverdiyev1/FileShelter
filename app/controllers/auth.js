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
    if (response.status === 201) {
      const payload = {
        user: {
          id: res.user.id
        }
      };

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.json({ staus:response.status, token });
      });
    }else{
      res.status(response.status).send(response.message);
    }
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.logout = async (req, res) => {
  res.json({ msg: 'Logout successful' });
};

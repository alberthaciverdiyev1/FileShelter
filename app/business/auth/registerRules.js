const { body, validationResult } = require('express-validator');

exports.validateRegister = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').notEmpty().isEmail().withMessage('Invalid email').normalizeEmail(),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword').notEmpty().custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

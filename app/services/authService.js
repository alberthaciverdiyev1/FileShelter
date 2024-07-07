const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (username, email, password) => {
  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return { status: 400, message: "Username or email already exists",user:[] };
    }

    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return { status: 201, message: "Succesfully registered" };

    // return user;
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid Credentials');
    }
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
  } catch (error) {
    throw error;
  }
};

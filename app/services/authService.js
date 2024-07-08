const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerUser = async (username, email, password) => {
  try {
    let user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return { status: 400, message: "Username or email already exists", user: [] };
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

exports.loginUser = async (email, password, rememberMe) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      // throw new Error('Invalid Credentials');
      return { status: 400, message: "Invalid Credentials" };

    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 400, message: "Invalid Credentials" };
    }
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1h' });
    return { status: 200, message: "Success", token: token };

  } catch (error) {
    throw error;
  }
};

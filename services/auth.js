const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signToken = async (id) => {
  const secretKey = 'rok-1665';
  return jwt.sign({ id }, secretKey, {
	expiresIn: '1d',
  });
};

const createSendToken = (user, token, statusCode, req, res) => {
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + 1 * 7 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  // Remove password from output
  user.pw = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const login = async (req, res, next) => {
  const { id, pw } = req.body;

  if (!id || !pw) {
    return next(new Error('Missing id or pw in the request body'));
  }

  console.log(id);
  console.log(pw);
  const user = await User.findOne({ id }).select('+pw');
  console.log(user);

  if (!user || !(await user.correctPassword(pw, user.pw))) {
    return next(new Error('Incorrect id or pw'));
  }

  const token = await signToken(user._id);
  createSendToken(user, token, 200, req, res);
};

module.exports = {
  login,
};

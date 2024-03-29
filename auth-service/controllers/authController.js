const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};

  switch (err.message) {
    case 'logged in':
      errors.email = 'You are already logged in';
      break;
    case 'incorrect email':
      errors.email = 'That email is not registered';
      break;
    case 'incorrect password':
      errors.password = 'That password is incorrect';
      break;
    case 'duplicate email':
      errors.email = 'That email is already registered';
      break;
    default:
      errors.email = 'Something went wrong';
      errors.password = 'Something went wrong';
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  if (req.cookies.jwt && jwt.verify(req.cookies.jwt, process.env.SECRET_KEY))
    return res.status(400).json({errors: {email: 'You are already logged in'}});

  const {email, password} = req.body;

  try {
    const user = await User.create({email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, sameSite: true, maxAge: maxAge * 1000});
    res.status(201).json({user: user._id});
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({errors});
  }
}

module.exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  if (req.cookies.jwt && jwt.verify(req.cookies.jwt, process.env.SECRET_KEY))
    return res.status(400).json({errors: {email: 'You are already logged in'}});

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    return res.status(200).json({user: user._id});
  } catch (err) {
    const errors = handleErrors(err);
    return res.status(400).json({errors});
  }
}

module.exports.logout_post = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
}

const User = require("../models/User");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = {email: '', password: ''};

  if (err.message === 'logged in') errors.email = 'You are already logged in';

  if (err.message === 'incorrect email') errors.email = 'That email is not registered';

  if (err.message === 'incorrect password') errors.password = 'That password is incorrect';

  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup_post = async (req, res) => {
  if (req.cookies.jwt && jwt.verify(req.cookies.jwt, process.env.JWT_SECRET))
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
  if (req.cookies.jwt && jwt.verify(req.cookies.jwt, process.env.JWT_SECRET))
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

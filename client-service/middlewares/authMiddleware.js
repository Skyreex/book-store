const jwt = require('jsonwebtoken');
const User = require('../../auth-service/models/User');

module.exports = requireAuth = (req, res, next) => {
  const token = req.cookies?.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({message: 'You must be logged in'})
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.json({message: 'You must be logged in'})
  }
};

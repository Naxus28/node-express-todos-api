import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../config/config';
import User from '../api/user/userModel';

// https://github.com/auth0/express-jwt
// "The JWT authentication middleware authenticates callers using a JWT. 
// If the token is valid, req.user will be set with the JSON object decoded 
// to be used by later middleware for authorization and access control."
const checkToken = expressJwt({ secret: config.secrets.jwt });

const decodeToken = (req, res, next) => {
  // make it optional to place token on query string
  // if it is, place it on the headers where it should be
  // so checkToken can see it. See follow the 'Bearer 034930493' format
  // so checkToken can see it and decode it
  if (req.query && req.query.hasOwnProperty('access_token')) {
    req.headers.authorization = 'Bearer ' + req.query.access_token;
  }

  // this will call next if token is valid
  // and send error if its not. It will attached
  // the decoded token to req.user
  checkToken(req, res, next);
};

const getFreshUser = (req, res, next) => {
  User.findById(req.user._id, (err, user) => {
    if (err) return errorHandler(err, next);

    if (!user) {
      // if no user is found it was not
      // it was a valid JWT but didn't decode
      // to a real user in our DB. Either the user was deleted
      // since the client got the JWT, or
      // it was a JWT from some other source
      res.status(401).send('Unauthorized');
    } else {
      // update req.user with fresh user from
      // stale token data
      req.user = user;
      next();
    }
  })
};

const verifyUser = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // if no username or password then send
  if (!username || !password) {
    res.status(400).send('You need a username and password');
    return;
  }

  // look user up in the DB so we can check
  // if the passwords match for the username
  User.findOne({username: username}, (err, user) => {
    if (err) return errorHandler(err, next);

    if (!user) {
      res.status(401).send('No user with the given username');
    } else {
      // checking password here
      if (!user.authenticate(password)) {
        res.status(401).send('Wrong password');
      } else {
        // if everything is good,
        // then attach to req.user
        // and call next so the controller
        // can sign a token from the req.user._id
        req.user = user;
        next();
      }
    }
  });
};

// util method to sign tokens on signup
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
// check https://github.com/auth0/node-jsonwebtoken
const signToken = id => jwt.sign(
  { _id: id },
  config.secrets.jwt,
  { expiresIn: config.expireTime }
);

const errorHandler = (err, next) => next(new Error(err));



export {
  decodeToken,
  getFreshUser,
  verifyUser,
  signToken
};

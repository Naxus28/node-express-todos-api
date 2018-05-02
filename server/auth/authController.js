var User = require('../api/user/userModel');
import { signToken } from './auth';

// req.user will be there from the middleware verify user. 
// Then we can just create a token and send it back for the client to consume
// const signup = (req, res, next) => {
//   res.json({token: signToken(req.user._id)}
// });
const signin = (req, res, next) => res.json({token: signToken(req.user._id)});

export {
  // signup,
  signin
};

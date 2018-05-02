const router = require('express').Router();
import { verifyUser } from './auth';
import { signin, signup }from './authController';

// if this route (/auth/signin) is hit
// we first verify if the user has the righ credentias
// then we signin: the 'signin' middleware will only be executed if
// 'verifyUser' validates the signin
router.post('/signin', verifyUser, signin);

export default (app) => app.use('/auth', router);

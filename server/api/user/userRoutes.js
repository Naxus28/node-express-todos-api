import express from 'express';
const router = express.Router();

import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  userParam
} from './userController';

router.param('id', userParam)

router.route('/')
  .get(getUsers)
  .post(addUser);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);


export default router;
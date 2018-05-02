import express from 'express';
import {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  todoParam
} from './todoController';

const router = express.Router();

router.param('id', todoParam);

router.route('/')
  .get(getTodos)
  .post(addTodo);

router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

export default router;

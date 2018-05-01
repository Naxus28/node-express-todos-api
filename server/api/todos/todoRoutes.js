import express from 'express';
import {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from './todoController';

const router = express.Router();

router.route('/')
  .get(getTodos)
  .post(addTodo);

router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

export default router;

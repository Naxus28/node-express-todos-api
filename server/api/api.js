import userRoutes from './users/userRoutes';
import todoRoutes from './todos/todoRoutes';

export default (app) => {
  app.use('/users', userRoutes);
  app.use('/todos', todoRoutes);
};
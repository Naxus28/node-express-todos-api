import userRoutes from './user/userRoutes';
import todoRoutes from './todo/todoRoutes';

export default (app) => {
  app.use('/users', userRoutes);
  app.use('/todos', todoRoutes);
};
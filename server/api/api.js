import userRoutes from './user/userRoutes';
import todoRoutes from './todo/todoRoutes';

export default (app) => {
  app.use('/user', userRoutes);
  app.use('/todo', todoRoutes);
};
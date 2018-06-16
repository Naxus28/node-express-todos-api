import colors from 'colors';
import User from './userModel';

let userParam = (req, res, next, id) => { 
  User.findById(id, (err, user) => {
    if (err) {
      return errorHandler(err, next);
    } else if (user) {
      req.user = user;
      next();
    } else {
      return errorHandler('Failed to load user', next);
    }
  })
};

const getUsers = (req, res, next) => {
  User.find({})
    .select('-password') // removes password from returned query
    .populate('todos')
    .exec((err, user) => {
      if (err) return errorHandler(err, next);
      res.json(user);
    });
};

const getUser = (req, res, next) => {
  // req.todo is available here because we found the todo on router.param('id')
  console.log('*req.user*: '.green, req.user); 

  User.findById(req.params.id)
    .populate('todos')
    .exec((err, user) => {
      if (err) return errorHandler(err, next);
      res.json(user);
    });
};

const addUser = (req, res, next) => {
  const newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) return errorHandler(err, next);
    res.json(user);
  });
};

const updateUser = (req, res, next) => {
  User.findOneAndUpdate({_id: req.params.id}, req.body, { new: true})
    .populate('todos')
    .exec((err, user) => {
      if (err) return errorHandler(err, next);
      res.json(user);
    });
};

const deleteUser = (req, res, next) => {
  User.findOneAndRemove({_id: req.params.id})
    .populate('todos')
    .exec((err, user) => {
      if (err) return errorHandler(err, next);
      res.json(user);
    });
};

const errorHandler = (err, next) => next(new Error(err));

export {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  userParam
};
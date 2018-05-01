import User from './userModel';

const getUsers = (req, res, next) => {
  User.find({})
    .populate('todos')
    .exec((err, user) => {
      if (err) return errorHandler(err, next);
      res.json(user);
    });
};

const getUser = (req, res, next) => {
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
  updateUser
};
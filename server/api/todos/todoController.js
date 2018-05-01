import Todo from './todoModel';
import User from '../users/userModel';

let addTodo = (req, res, next) => {
  let newTodo = new Todo(req.body);

  newTodo.save((err, todo) => {
    if (err) return errorHandler(err, next);

    //save the todo to user.todos when todo is created
    //the todo schema requires a todo to have a user when created
    //the user is represented by the user id, which mongoose uses
    //to hydrate (via populate('user') where user is the key that points to the user id in the todo model) 
    //the todo object (grab the user whose id is saved in the todo object) 
    //when we request the todo. Basically, this joins the documents at execution time.
    
    // Either update methods below work

    //check http://mongoosejs.com/docs/populate.html
    // User.findById(req.body.user, (err, user) => {
    //   if (err) return errorHandler(err, next);
      
    //   // check http://mongoosejs.com/docs/populate.html#refs-to-children
    //   user.todos.push(todo);
    //   user.save();
    // });

    User.findOneAndUpdate({_id: req.body.user}, {$push: {todos: todo}}, (err, user) => {
      if (err) return errorHandler(err, next);
    });

    res.json(todo);
  });
};

let getTodo = (req, res, next) => {
  Todo.findById(req.params.id)
    // the name in populate() is the property created in the todo model('user'), 
    // not the name given to the user model object ('User')
    .populate('user') 
    .exec((err, todo) => {
      console.log('todo: ', todo);
      if (err) return errorHandler(err, next);
      res.json(todo);
    });
};

let getTodos = (req, res, next) => {
  Todo.find({})
    .populate('user')
    .exec((err, todos) => {
      if (err) return errorHandler(err, next);
      res.json(todos);
    });
};

let updateTodo = (req, res, next) => {
  Todo.findOneAndUpdate({_id: req.params.id}, req.body, { new: true })
    .populate('user')
    .exec((err, todos) => {
      if (err) return errorHandler(err, next);
      res.json(todos);
    });
};

let deleteTodo = (req, res, next) => {
  Todo.findOneAndRemove({_id: req.params.id})
    .populate('User')
    .exec((err, todos) => {
      if (err) return errorHandler(err, next);
      res.json(todos);
    });;
};

const errorHandler = (err, next) => next(new Error(err));

export {
  addTodo,
  getTodo,
  getTodos,
  updateTodo,
  deleteTodo
};


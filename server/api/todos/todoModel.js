import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Todo = new Schema({
  item: {
    type: String,
    required: 'Todo item is required'
  },
  completed: {
    type: Boolean,
    default: false 
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: 'A todo must have a user.'
  },
  created_date: {
    type: Date,
    default: Date.now 
  }
});

export default mongoose.model('Todo', Todo);
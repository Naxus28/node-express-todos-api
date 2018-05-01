import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  firstName: {
    type: String,
    required: 'User must have a first name'
  },
   lastName: {
    type: String,
    required: 'User must have a last name'
  },
  age: Number,
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

export default mongoose.model('User', User);
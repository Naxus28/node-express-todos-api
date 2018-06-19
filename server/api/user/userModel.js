import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const User = new Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    required: 'Username is mandatory.',
    unique: 'This username has already been taken.'
  },
  email: {
    type: String,
    required: 'User must have an email to signup',
    unique: 'This email address has already been registered.'
  },

  // dont store  password as plain text
  password: {
    type: String,
    required: true
  },
  age: Number,
  created_date: {
    type: Date,
    default: Date.now 
  },
  todos: [{
    type: Schema.Types.ObjectId,
    ref: 'Todo'
  }]
});

// mongoose instance methods: methods will be availabe 
// to any instance of the user obj
// we can call the method on the user object itself "e.g. user.authenticate(password)"
// check http://mongoosejs.com/docs/guide.html#methods
User.methods = {
  // check the passwords on signin
  authenticate(plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  
  // salt and hash the password
  encryptPassword(plainTextPword) {
    if (!plainTextPword) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10); // salt password
      return bcrypt.hashSync(plainTextPword, salt); // hash salted password
    }
  }
};


// this user schema middleware will run before a document is created
// check http://mongoosejs.com/docs/api.html#schema_Schema-pre
User.pre('save', function(next) {
  // 'isModified()' returns true if this document was modified, else false.
  // for more on 'isModified()' check http://mongoosejs.com/docs/api.html#document_Document-isModified
  if (!this.isModified('password')) return next();

  // this.encryptPassword refers to the method added to the schema
  this.password = this.encryptPassword(this.password);
  next();
})


export default mongoose.model('User', User);


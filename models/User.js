const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema (
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      trim: true,
      required: [true, 'username is required'],
      unique: true
    },
    email: {
      type: String,
      //match: [/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Please use a valid email address'],
      required: [true, 'email is required'],
      unique: true,
      trim: true
    },
    password: {
      type:String,
      required: [true, 'password is required']
    }
    
  },
  {
    timestamps: true
   }
)

module.exports = model('User', userSchema);
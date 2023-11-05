import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: 'viewer',
    enum: ['viewer', 'teacher', 'admin'],
  }
})

export const User = mongoose.model('User', userSchema);
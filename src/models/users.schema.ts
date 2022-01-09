import mongoose, { Schema } from 'mongoose'
import User from './users.types'

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: false,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    required: false,
    default: () => Date.now(),
  },
})

export const UserModel = mongoose.model<User>('User', userSchema)

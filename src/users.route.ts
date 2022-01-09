import { Request, Response, Router, json, NextFunction } from 'express'
import { UserModel } from './models/users.schema'
import { jsonError, jsonMessage } from './utils/messages'
import jwt from 'jsonwebtoken'
import User from './models/users.types'
import bcrypt from 'bcryptjs'
import config from 'config'

export const usersRouter = Router()

// Create user
usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    req.body.password = hashPassword

    const savedUser = await UserModel.create<User>(req.body)
    res.send(savedUser)
  } catch (err) {}
})

// Get users
usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({})
    if (!users) {
      jsonMessage(200, 'No users records', res)
      return
    }
    jsonMessage(200, users, res)
  } catch (err) {
    jsonError(404, 'Cannot fetch users.', err, res)
  }
})

// Login user
usersRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({
      name: req.body.name,
    })

    if (user) {
      const result = {
        name: user.name,
        email: user.email,
        password: user.password,
        _id: user._id,
      }

      const validPassword = bcrypt.compare(req.body.password, result.password)

      if (!validPassword) jsonMessage(400, 'Invalid password.', res)

      const secret = config.get<string>('TOKEN_SECRET')

      const token = jwt.sign({ _id: user?._id }, secret)

      res.header('authorization', token).send(token)
    } else {
      jsonMessage(400, 'User does not exist.', res)
    }
  } catch (err) {
    jsonError(404, 'Cannot login user.', err, res)
  }
})

// Delete all users
usersRouter.delete('/', async (req: Request, res: Response) => {
  try {
    await UserModel.collection.drop()
    jsonMessage(200, 'All user records have been deleted.', res)
  } catch (err) {
    jsonError(404, 'Cannot delete user records.', err, res)
  }
})

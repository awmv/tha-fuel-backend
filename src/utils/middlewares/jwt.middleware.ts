import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import config from 'config'
import logger from '../../utils/logger'
import { jsonError, jsonMessage } from '../messages'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'Access denied!' })

    logger.info(process.env.TOKEN_SECRET)
    const secret = config.get<string>('TOKEN_SECRET')
    jwt.verify(token, secret as string, (err: any, user: any) => {
      console.log(err)

      if (err) return res.sendStatus(403)
      res.locals.user = user

      next()
    })
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' })
  }
}

export default verifyToken

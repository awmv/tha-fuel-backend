import { Response } from 'express'
import logger from './logger'

export const jsonMessage = (
  code: number,
  msg: string | Object,
  res: Response
) => {
  res.status(code).send({
    message: msg,
  })
  if (typeof msg === 'string' || msg instanceof String) {
    logger.info(msg)
  }
}

export const jsonError = (
  code: number,
  msg: string,
  err: any,
  res: Response
) => {
  res.status(code).send({
    error: {
      message: msg,
    },
  })
  logger.error(err)
}

import express, { json } from 'express'
import { fuelStationsRouter } from './fuelstations.route'
import logger from './utils/logger'
import connectToDatabase from './utils/connect'
import cors from 'cors'
import { usersRouter } from './users.route'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = 3000

const prefix = '/api/v2'
app.use(cors())
app.use(json())
app.use(`${prefix}/fuelstations`, fuelStationsRouter)
app.use(`${prefix}/users`, usersRouter)
app.get('*', (_, res) =>
  res.status(404).json({
    message: 'Endpoint does not exist',
  })
)

const server = app.listen(3000, '0.0.0.0', async () => {
  logger.info(`Server started on port ${port}`)
  await connectToDatabase()
})

export default server

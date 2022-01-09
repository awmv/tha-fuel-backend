import mongoose from 'mongoose'
import config from 'config'
import logger from './logger'

async function connectToDatabase() {
  const dbUri = process.env.MONGODB_URI || config.get<string>('MONGODB_URI')

  try {
    await mongoose.connect(dbUri)
    logger.info('Database connected')
  } catch (error) {
    logger.error('Could not establish connetion to database', error)
    process.exit(1)
  }
}

export default connectToDatabase

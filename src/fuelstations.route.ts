import { Request, Response, Router, json } from 'express'
import FuelStation from './models/fuelstations.types'
import { FuelStationModel } from './models/fuelstations.schema'
import { jsonError, jsonMessage } from './utils/messages'
import verifyToken from './utils/middlewares/jwt.middleware'

export const fuelStationsRouter = Router()

fuelStationsRouter.use(json())

fuelStationsRouter.get('/healthcheck', (req: Request, res: Response) => {
  jsonMessage(200, { version: 'v2' }, res)
})

// GET all Fuel Stations
fuelStationsRouter.get(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const fuelStations = await FuelStationModel.find({})
      jsonMessage(
        200,
        fuelStations
          ? fuelStations
          : 'No fuel station records have been found.',
        res
      )
    } catch (err) {
      jsonError(404, 'cannot fetch records.', err, res)
    }
  }
)

// GET Fuel Station by id
fuelStationsRouter.get(
  '/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const fuelStation = await FuelStationModel.findOne({
        id: req?.params?.id,
      })
      jsonMessage(
        200,
        fuelStation ? fuelStation : 'Cannot find record with matching id.',
        res
      )
    } catch (err) {
      jsonError(404, 'Cannot fetch record for id.', err, res)
    }
  }
)

// Create new fuel station
fuelStationsRouter.post(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const fuelStation = await FuelStationModel.create<FuelStation>(req.body)
      jsonMessage(200, fuelStation, res)
    } catch (err) {
      jsonError(404, 'Cannot create new fuel station record.', err, res)
    }
  }
)

// Update fuel station
fuelStationsRouter.put(
  '/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      await FuelStationModel.updateOne(
        { id: req.params.id },
        { $set: req.body }
      )
      jsonMessage(200, req.body, res)
    } catch (err) {
      jsonError(404, 'Cannot update fuel station record.', err, res)
    }
  }
)

// Delete Fuel Station by id
fuelStationsRouter.delete(
  '/:id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      await FuelStationModel.deleteOne({ id: req.params.id })
      jsonMessage(200, 'Fuel station record has been deleted.', res)
    } catch (err) {
      jsonError(404, 'Cannot delete fuel station record.', err, res)
    }
  }
)
// Delete all Fuel Stations
fuelStationsRouter.delete(
  '/',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      await FuelStationModel.collection.drop()
      jsonMessage(200, 'All fuel station records have been deleted.', res)
    } catch (err) {
      jsonError(404, 'Cannot delete all fuel station records.', err, res)
    }
  }
)

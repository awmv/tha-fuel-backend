import mongoose, { Schema } from 'mongoose'
import { customAlphabet } from 'nanoid'
import FuelStation, { Pump } from './fuelstations.types'

const nanoid = customAlphabet('0123456789', 5)

export const pumpSchema = new Schema<Pump>({
  fuel_type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
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

export const fuelStationSchema = new Schema<FuelStation>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => `MIGROL_${nanoid()}`,
    },
    name: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    latitude: {
      type: Number,
      required: false,
    },
    longitude: {
      type: Number,
      required: false,
    },
    pumps: {
      type: [pumpSchema],
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
  },
  {
    versionKey: false,
  }
)

export const FuelStationModel = mongoose.model<FuelStation>(
  'FuelStation',
  fuelStationSchema
)

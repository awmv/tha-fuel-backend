export default interface FuelStation {
  id?: string
  name: string
  address: string
  city: string
  latitude: number
  longitude: number
  pumps?: Pump[]
  createdAt?: Date
  updatedAt?: Date
}

export interface Pump {
  id?: number
  fuel_type: string
  price: number
  available: boolean
  createdAt?: Date
  updatedAt?: Date
}

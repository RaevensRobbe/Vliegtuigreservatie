import type Dest from './PopularDestinationModel.type'

export default interface Flight {
  FlightId: string
  Name: string
  Date: Date
  Price: number
  Gate: number
  DestinationId: string
  StartId: string
  PlaneId: string
  Destination: Dest
  Start: Dest
}

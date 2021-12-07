import type Dest from './PopularDestinationModel.type'
export default interface Plane {
  BusinessSeats: number
  EconomySeats: number
}

export default interface Seat {
  class: string
  column: string
  row: string
}
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
  Plane: Plane
  Ticket: Array<Array<{ Seat }>>
}

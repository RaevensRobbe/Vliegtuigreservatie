export default interface Dest {
  DestinationId: string
  Name: string
  Popularity: number
  Picture: string
  Coordinates: [number, number]
}

export default interface PopularDestination {
  Name: string
  Dest: Dest
}

export default interface PopularDestinationGraphql {
  destinationId: string
  name: string
  intro: string
  summary: string
}

import { writable } from 'svelte/store'

// export const FlightStore = writable({
//   departureLocation: 'Brussel, Belgium',
//   destinationLocation: null,
//   departureDate: null,
//   retourDate: null,
//   children: 0,
//   adulst: 0,
//   }
// )

export const FlightStore = writable<{
  departureLocation: string
  destinationLocation: string
  departureLocationId: number
  destinationLocationId: number
  departureDate: Date
  retourDate: Date
  children: number
  adults: number
}>({
  departureLocation: 'Brussel, Belgium',
  departureLocationId: 3, //voor te testen
  destinationLocation: null,
  destinationLocationId: 1, //voor test data
  departureDate: null,
  retourDate: null,
  children: 0,
  adults: 0,
})

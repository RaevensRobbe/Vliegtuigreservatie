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
  departureCountry: string
  departureCity: string
  departureLocationId: number

  destinationCountry: string
  destinationCity: string
  destinationLocationId: number

  departureDate: Date
  retourDate: Date

  children: number
  adults: number

  departureFlight: number
  retourFlight: number
}>({
  departureCountry: null,
  departureCity: null,
  departureLocationId: null,

  destinationCountry: null,
  destinationCity: null,
  destinationLocationId: null,

  departureDate: null,
  retourDate: null,

  children: 0,
  adults: 0,

  departureFlight: null,
  retourFlight: null,
})

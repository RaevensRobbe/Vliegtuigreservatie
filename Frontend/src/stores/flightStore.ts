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
  departureCountry: string
  departureCity: string
  departureLocationId: number

  destinationLocation: string
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
  departureLocation: 'Brussel, Belgium',
  departureCountry: null,
  departureCity: null,
  departureLocationId: 3, //voor te testen

  destinationLocation: null,
  destinationCountry: null,
  destinationCity: null,
  destinationLocationId: 1, //voor test data
  
  departureDate: null,
  retourDate: null,
  
  children: 0,
  adults: 0,
  
  departureFlight: null,
  retourFlight: null,
})

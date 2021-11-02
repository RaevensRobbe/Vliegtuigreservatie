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
  departureDate: Date
  retourDate: Date
  children: number
  adults: number
}>({
  departureLocation: 'Brussel, Belgium',
  destinationLocation: null,
  departureDate: null,
  retourDate: null,
  children: 0,
  adults: 0,
})

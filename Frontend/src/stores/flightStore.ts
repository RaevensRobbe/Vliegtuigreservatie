import { writable } from 'svelte/store'

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
  departurePrice: number
  retourFlight: number
  retourPrice: number
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

  departureFlight: 1,
  departurePrice: null,
  retourFlight: 3,
  retourPrice: null,
})

import { writable } from 'svelte/store'

export const FlightStore = writable<{
  departureCountry: string
  departureCity: string
  departureLocationId: number
  departureCoordinates: any

  destinationCountry: string
  destinationCity: string
  destinationLocationId: number
  destinationCoordinates: any

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
  departureCoordinates: null,

  destinationCountry: null,
  destinationCity: null,
  destinationLocationId: null,
  destinationCoordinates: null,

  departureDate: null,
  retourDate: null,

  children: 0,
  adults: 0,

  departureFlight: null,
  departurePrice: null,
  retourFlight: null,
  retourPrice: null,
})

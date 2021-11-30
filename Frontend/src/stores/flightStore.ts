import { writable } from 'svelte/store'

export const FlightStore = writable<{
  departureCountry: string
  departureCity: string
  departureLocationId: number
  departureCoordinates: any
  departureAbbreviation: string

  destinationCountry: string
  destinationCity: string
  destinationLocationId: number
  destinationCoordinates: any
  destinationAbbreviation: string

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
  departureAbbreviation: null,

  destinationCountry: null,
  destinationCity: null,
  destinationLocationId: null,
  destinationCoordinates: null,
  destinationAbbreviation: null,

  departureDate: null,
  retourDate: null,

  children: 0,
  adults: 0,

  departureFlight: null,
  departurePrice: null,
  retourFlight: null,
  retourPrice: null,
})

export const bookingTicket = writable<{
  ticketId: string
}>({
  ticketId: null,
})

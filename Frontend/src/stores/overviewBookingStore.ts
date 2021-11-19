import { writable } from 'svelte/store'

var currentYear = new Date().getFullYear() + 1

export const BookingStore = writable<{
  previousYear: number
}>({
  previousYear: currentYear,
})

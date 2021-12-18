import { writable } from 'svelte/store'

var currentYear = new Date().getFullYear() - 1

export const AllUpcoming = writable<{
  previousYear: number
}>({
  previousYear: currentYear,
})

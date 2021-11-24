import { writable } from 'svelte/store'

const paywallCompStore = writable<{
  showPaywall: boolean
}>({
  showPaywall: false,
})

export default {
  subscribe: paywallCompStore.subscribe,
  set: paywallCompStore.set,
}

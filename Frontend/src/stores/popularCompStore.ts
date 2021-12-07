import { writable } from 'svelte/store'

const popularCompStore = writable<{
  showPopular: boolean
  img: string
  name: string
  intro: string
  summary: string
}>({
  showPopular: false,
  img: null,
  name: null,
  intro: null,
  summary: null,
})

export default {
  subscribe: popularCompStore.subscribe,
  set: popularCompStore.set,
}

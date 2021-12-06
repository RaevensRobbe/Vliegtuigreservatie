// import { writable } from 'svelte/store'

// const editStore = writable<{
//   flightNr: string
// }>({
//   flightNr: null,
// })

// export default {
//   subscribe: editStore.subscribe,
//   set: editStore.set,
// }

import { writable } from 'svelte/store'

export const editStore = writable([])

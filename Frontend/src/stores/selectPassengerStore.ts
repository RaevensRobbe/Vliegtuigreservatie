import { writable } from 'svelte/store'

const passengerStore = writable<{
    fn : string;
    ln : string;
}>({
    fn : '',
    ln : ''
});

export default{
    subscribe: passengerStore.subscribe,
    set: passengerStore.set
}
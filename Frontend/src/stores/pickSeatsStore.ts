import { writable } from "svelte/store";

const seatsStore = writable<{
    ecoSeats : number;
    bussSeats: number;
}>({
    ecoSeats : 0,
    bussSeats : 0
});

export default{
    subscribe: seatsStore.subscribe,
    set: seatsStore.set
}
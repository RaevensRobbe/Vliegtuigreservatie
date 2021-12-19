import { writable } from 'svelte/store'

const languageStore = writable<{
    language:string;
}>({
    language:"en"
});

export default{
    subscribe: languageStore.subscribe,
    set: languageStore.set,
}
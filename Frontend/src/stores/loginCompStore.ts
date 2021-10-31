import { writable } from "svelte/store";

const loginCompStore = writable<{
    showRegister : boolean;
    showLogin: boolean;
}>({
    showRegister : false,
    showLogin : false
});

export default{
    subscribe: loginCompStore.subscribe,
    set: loginCompStore.set
}
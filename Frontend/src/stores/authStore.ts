import { writable } from "svelte/store";
import type firebase from "firebase/app"

const authStore = writable<{
    isLoggedIn : boolean;
    user?: any;    
    firebaseControlled: boolean;
    admin?: boolean;
}>({
    isLoggedIn: false,
    firebaseControlled: false,
    admin:false,
});

export default{
    subscribe: authStore.subscribe,
    set: authStore.set
}
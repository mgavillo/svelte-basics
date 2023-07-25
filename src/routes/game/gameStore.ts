import { writable } from 'svelte/store'

export const hover = writable({name:"", screenPos:[0, 0], pos:[0, 0, 0]});
export const action = writable<null | string >(null)
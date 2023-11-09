import { writable } from 'svelte/store';

export const storesInitialized = writable(false);
export const ddragonVersionStore = writable('');
export const summonerSpellDataStore = writable({} as any);
export const runesDataStore = writable([] as RunePath[]);
export const queuesStore = writable([] as any[]);

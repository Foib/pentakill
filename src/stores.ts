import { writable } from 'svelte/store';

export const storesInitialized = writable(false);
export const itemDataStore = writable<ItemData[]>([]);
export const mapsDataStore = writable<MapData[]>([]);
export const queuesStore = writable<QueueData[]>([]);
export const runesDataStore = writable<RuneData[]>([]);
export const summonerSpellDataStore = writable<SummonerSpellData[]>([]);

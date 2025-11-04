import getMapsData from '$lib/getMapsData';
import getQueues from '$lib/getQueues';
import getRunesData from '$lib/getRunesData';
import getSummonerSpellData from '$lib/getSummonerSpellData';
import {
	itemDataStore,
	summonerSpellDataStore,
	queuesStore,
	storesInitialized,
	runesDataStore,
	mapsDataStore
} from '../stores';
import getItemData from '$lib/getItemData';
import { get } from 'svelte/store';

export function load(event) {
	if (get(storesInitialized)) {
		return;
	}

	let promises = [];

	promises.push(
		getItemData(event.fetch).then((itemData) => {
			itemDataStore.set(itemData);
		})
	);

	promises.push(
		getQueues(event.fetch).then((queues) => {
			queuesStore.set(queues);
		})
	);

	promises.push(
		getMapsData(event.fetch).then((mapsData) => {
			mapsDataStore.set(mapsData);
		})
	);

	promises.push(
		getSummonerSpellData(event.fetch).then((summonerSpellData) => {
			summonerSpellDataStore.set(summonerSpellData);
		})
	);

	promises.push(
		getRunesData(event.fetch).then((runesData) => {
			runesDataStore.set(runesData);
		})
	);

	Promise.all(promises).then(() => {
		storesInitialized.set(true);
		console.log('Stores initialized');
	});
}

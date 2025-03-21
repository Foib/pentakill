import getDdragonVersion from '$lib/getDdragonVersion';
import getMapsData from '$lib/getMapsData';
import getQueues from '$lib/getQueues';
import getRunesData from '$lib/getRunesData';
import getSummonerSpellData from '$lib/getSummonerSpellData';
import {
	ddragonVersionStore,
	summonerSpellDataStore,
	queuesStore,
	storesInitialized,
	runesDataStore,
	mapsDataStore
} from '../stores';

export function load() {
	getQueues().then((queues) => {
		queuesStore.set(queues);
	});

	getMapsData().then((mapsData) => {
		mapsDataStore.set(mapsData);
	});

	getDdragonVersion().then((ddragonVersion) => {
		ddragonVersionStore.set(ddragonVersion);

		getSummonerSpellData().then((summonerSpellData) => {
			summonerSpellDataStore.set(summonerSpellData);

			getRunesData().then((runesData) => {
				runesDataStore.set(runesData);

				storesInitialized.set(true);
				console.log('Stores initialized');
			});
		});
	});
}

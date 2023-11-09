import getDdragonVersion from '$lib/getDdragonVersion';
import getQueues from '$lib/getQueues';
import getRunesData from '$lib/getRunesData';
import getSummonerSpellData from '$lib/getSummonerSpellData';
import {
	ddragonVersionStore,
	summonerSpellDataStore,
	queuesStore,
	storesInitialized,
	runesDataStore
} from '../stores';

export function load() {
	getDdragonVersion().then((ddragonVersion) => {
		ddragonVersionStore.set(ddragonVersion);

		getSummonerSpellData(ddragonVersion).then((summonerSpellData) => {
			summonerSpellDataStore.set(summonerSpellData);

			getRunesData(ddragonVersion).then((runesData) => {
				runesDataStore.set(runesData);

				getQueues().then((queues) => {
					queuesStore.set(queues);

					storesInitialized.set(true);
					console.log('Stores initialized');
				});
			});
		});
	});
}

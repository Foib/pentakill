import { get } from 'svelte/store';
import { ddragonVersionStore, summonerSpellDataStore } from '../stores';

export default async function getSummonerSpellIcon(summonerSpellId: number) {
	const ddragonVersion = get(ddragonVersionStore);
	const summonerSpellData = get(summonerSpellDataStore);

	for (const summonerSpell in summonerSpellData.data) {
		if (summonerSpellData.data[summonerSpell].key == summonerSpellId) {
			const ret = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${summonerSpellData.data[summonerSpell].image.full}`;

			return ret;
		}
	}
}

import { get } from 'svelte/store';
import { ddragonVersionStore } from '../stores';

export default async function getSummonerSpellData() {
	const ddragonVersion = get(ddragonVersionStore);

	return await (
		await fetch(
			`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/summoner.json`
		)
	).json();
}

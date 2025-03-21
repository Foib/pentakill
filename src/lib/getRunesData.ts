import { get } from 'svelte/store';
import { ddragonVersionStore } from '../stores';

export default async function getRunesData(): Promise<RunePath[]> {
	const ddragonVersion = get(ddragonVersionStore);
	return await (
		await fetch(
			`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/runesReforged.json`
		)
	).json();
}

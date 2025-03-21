import { get } from 'svelte/store';
import { ddragonVersionStore } from '../stores';

export default async function getSummonerIcon(iconId: number) {
	const ddragonVersion = get(ddragonVersionStore);
	return `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${iconId}.png`;
}

import { get } from 'svelte/store';
import { ddragonVersionStore } from '../stores';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/';

export default function getItemIcon(itemId: number) {
	const ddragonVersion = get(ddragonVersionStore);
	return `${baseUrl}${ddragonVersion}/img/item/${itemId}.png`;
}

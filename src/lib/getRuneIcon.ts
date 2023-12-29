import { get } from 'svelte/store';
import { runesDataStore } from '../stores';

const baseUrl = 'https://ddragon.leagueoflegends.com/cdn/img/';

export default function getRuneIcon(runeId: number) {
	let path = '';

	console.log(runeId);

	get(runesDataStore).forEach((runePath) => {
		if (runePath.id == runeId) {
			path = baseUrl + runePath.icon;
		} else {
			runePath.slots.forEach((runeSlot) => {
				runeSlot.runes.forEach((rune) => {
					if (rune.id === runeId) {
						path = baseUrl + rune.icon;
					}
				});
			});
		}
	});

	return path;
}

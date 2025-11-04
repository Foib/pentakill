import { get } from 'svelte/store';
import { mapsDataStore } from '../stores';

export default function getMapName(mapId: number) {
	let mapName = '';
	get(mapsDataStore).forEach((map) => {
		if (map.id === mapId) {
			mapName = map.name;
		}
	});

	return mapName;
}

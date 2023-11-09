import { get } from 'svelte/store';
import { mapsDataStore } from '../stores';

export default function getMapName(mapId: number) {
	let mapName = '';
	get(mapsDataStore).forEach((map) => {
		if (map.mapId === mapId) {
			mapName = map.mapName;
		}
	});

	return mapName;
}

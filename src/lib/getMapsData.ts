export default async function getMapsData(loadFetch: typeof globalThis.fetch) {
	return (await (
		await loadFetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/maps.json'
		)
	).json()) as MapData[];
}

export default async function getMapsData(fetch: typeof globalThis.fetch) {
	return (await (
		await fetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/maps.json'
		)
	).json()) as MapData[];
}

export default async function getRunesData(loadFetch: typeof globalThis.fetch) {
	return (await (
		await loadFetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json'
		)
	).json()) as RuneData[];
}

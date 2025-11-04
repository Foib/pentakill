export default async function getItemData(loadFetch: typeof globalThis.fetch) {
	return (await (
		await loadFetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
		)
	).json()) as ItemData[];
}

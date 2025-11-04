export default async function getItemData(fetch: typeof globalThis.fetch) {
	return (await (
		await fetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/items.json'
		)
	).json()) as ItemData[];
}

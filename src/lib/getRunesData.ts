export default async function getRunesData(fetch: typeof globalThis.fetch) {
	return (await (
		await fetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json'
		)
	).json()) as RuneData[];
}

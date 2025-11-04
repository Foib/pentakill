export default async function getSummonerSpellData(fetch: typeof globalThis.fetch) {
	return (await (
		await fetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json'
		)
	).json()) as SummonerSpellData[];
}

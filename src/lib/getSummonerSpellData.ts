export default async function getSummonerSpellData(loadFetch: typeof globalThis.fetch) {
	return (await (
		await loadFetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json'
		)
	).json()) as SummonerSpellData[];
}

export default async function getSummonerSpellData(ddragonVersion: string) {
	return await (
		await fetch(
			`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/summoner.json`
		)
	).json();
}

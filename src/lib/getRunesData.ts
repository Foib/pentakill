export default async function getRunesData(ddragonVersion: string): Promise<RunePath[]> {
	return await (
		await fetch(
			`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/runesReforged.json`
		)
	).json();
}

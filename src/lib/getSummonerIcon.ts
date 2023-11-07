export default async function getSummonerIcon(iconId: string) {
	const version = (
		await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json()
	)[0];

	return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png`;
}

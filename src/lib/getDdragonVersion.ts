export default async function getDdragonVersion() {
	return (await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json())[0];
}

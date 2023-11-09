export default async function getMapsData() {
	return await (await fetch(`https://static.developer.riotgames.com/docs/lol/maps.json`)).json();
}

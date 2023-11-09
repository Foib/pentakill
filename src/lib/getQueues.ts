export default async function getQueues() {
	return await (await fetch(`https://static.developer.riotgames.com/docs/lol/queues.json`)).json();
}

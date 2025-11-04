export default async function getQueues(fetch: typeof globalThis.fetch) {
	return (await (
		await fetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/queues.json'
		)
	).json()) as QueueData[];
}

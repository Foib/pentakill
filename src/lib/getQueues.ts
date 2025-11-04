export default async function getQueues(loadFetch: typeof globalThis.fetch) {
	return (await (
		await loadFetch(
			'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/queues.json'
		)
	).json()) as QueueData[];
}

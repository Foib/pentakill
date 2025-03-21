export default function getRankedQueueName(queueType: string) {
	switch (queueType) {
		case 'RANKED_SOLO_5x5':
			return 'SOLO/DUO';
		case 'RANKED_FLEX_SR':
			return 'FLEX 5V5';
		default:
			return 'Unknown';
	}
}

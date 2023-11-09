export default function getQueueName(queueId: number) {
	if (inRange(queueId, 400, 499)) {
		switch (queueId) {
			case 400:
				return 'Draft Pick';
			case 420:
				return 'Ranked Solo';
			case 430:
				return 'Blind Pick';
			case 440:
				return 'Ranked Flex';
			case 450:
				return 'ARAM';
			default:
				return 'Unknown';
		}
	} else if (inRange(queueId, 700, 799)) {
		switch (queueId) {
			case 700:
				return 'Clash';
			case 720:
				return 'ARAM Clash';
			default:
				return 'Unknown';
		}
	} else if (inRange(queueId, 800, 899)) {
		switch (queueId) {
			case 830:
				return 'Intro';
			case 840:
				return 'Beginner';
			case 850:
				return 'Intermediate';
			default:
				return 'Unknown';
		}
	} else {
		return 'Unknown';
	}
}

function inRange(x: number, min: number, max: number) {
	return x >= min && x <= max;
}

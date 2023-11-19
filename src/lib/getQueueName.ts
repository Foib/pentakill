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
			case 490:
				return 'Quickplay';
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
		if (queueId === 600) {
			return 'Blood Hunt Assassin';
		} else if (queueId === 610) {
			return 'Dark Star';
		} else if (queueId === 900) {
			return 'ARURF';
		} else if (queueId === 910) {
			return 'Ascension';
		} else if (queueId === 920) {
			return 'Legend of the Poro King';
		} else if (queueId === 940) {
			return 'Nexus Siege';
		} else if (queueId === 950 || queueId === 960) {
			return 'Doom Bots';
		} else if (queueId === 980) {
			return 'Star Guardian Invasion';
		} else if (queueId === 1000) {
			return 'PROJECT: Hunters';
		} else if (queueId === 1010) {
			return 'Snow ARURF';
		} else if (queueId === 1020) {
			return 'One for All';
		} else if (inRange(queueId, 1030, 1070)) {
			return 'Odyssey Extraction';
		} else if (queueId === 1200 || queueId === 1300) {
			return 'Nexus Blitz';
		} else if (queueId === 1400) {
			return 'Ultimate Spellbook';
		} else if (queueId === 1700) {
			return 'Arena';
		} else {
			return 'Unknown';
		}
	}
}

function inRange(x: number, min: number, max: number) {
	return x >= min && x <= max;
}

export function formatRankText(tier: string, rank: string): string {
	if (tier === 'MASTER' || tier === 'GRANDMASTER' || tier === 'CHALLENGER') {
		return tier;
	}

	return `${tier} ${rank}`;
}

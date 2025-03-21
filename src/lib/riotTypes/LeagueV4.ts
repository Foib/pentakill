/**
 * @param leagueId -
 * @param summonerId - Player's encrypted summonerId.
 * @param summonerName -
 * @param queueType -
 * @param tier -
 * @param rank - The player's division within a tier.
 * @param leaguePoints -
 * @param wins - Winning team on Summoners Rift.
 * @param losses - Losing team on Summoners Rift.
 * @param hotStreak -
 * @param veteran -
 * @param freshBlood -
 * @param inactive -
 * @param miniSeries -
 */
type LeagueEntryDTO = {
	leagueId: string;
	summonerId: string;
	summonerName: string;
	queueType: string;
	tier: string;
	rank: string;
	leaguePoints: number;
	wins: number;
	losses: number;
	hotStreak: boolean;
	veteran: boolean;
	freshBlood: boolean;
	inactive: boolean;
	miniSeries: MiniSeriesDTO;
};
/**
 * @param losses -
 * @param progress -
 * @param target -
 * @param wins -
 */
type MiniSeriesDTO = {
	losses: number;
	progress: string;
	target: number;
	wins: number;
};

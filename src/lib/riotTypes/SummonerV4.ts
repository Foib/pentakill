/**
 * @param accountId - Encrypted account ID. Max length 56 characters.
 * @param profileIconId - ID of the summoner icon associated with the summoner.
 * @param revisionDate - Date summoner was last modified specified as epoch milliseconds. The following events will update this timestamp: profile icon change, playing the tutorial or advanced tutorial, finishing a game, summoner name change
 * @param name - Summoner name.
 * @param id - Encrypted summoner ID. Max length 63 characters.
 * @param puuid - Encrypted PUUID. Exact length of 78 characters.
 * @param summonerLevel - Summoner level associated with the summoner.
 */
type SummonerDto = {
	accountId: string;
	profileIconId: number;
	revisionDate: number;
	id: string;
	puuid: string;
	summonerLevel: number;
};

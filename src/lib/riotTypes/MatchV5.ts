/**
 * @param metadata - Match metadata.
 * @param info - Match info.
 */
type MatchDto = {
	metadata: MetadataDto;
	info: InfoDto;
};
/**
 * @param dataVersion - Match data version.
 * @param matchId - Match id.
 * @param participants - A list of participant PUUIDs.
 */
type MetadataDto = {
	dataVersion: string;
	matchId: string;
	participants: string[];
};
/**
 * @param gameCreation - Unix timestamp for when the game is created on the game server (i.e., the loading screen).
 * @param gameDuration - Prior to patch 11.20, this field returns the game length in milliseconds calculated from gameEndTimestamp - gameStartTimestamp. Post patch 11.20, this field returns the max timePlayed of any participant in the game in seconds, which makes the behavior of this field consistent with that of match-v4. The best way to handling the change in this field is to treat the value as milliseconds if the gameEndTimestamp field isn't in the response and to treat the value as seconds if gameEndTimestamp is in the response.
 * @param gameEndTimestamp - Unix timestamp for when match ends on the game server. This timestamp can occasionally be significantly longer than when the match "ends". The most reliable way of determining the timestamp for the end of the match would be to add the max time played of any participant to the gameStartTimestamp. This field was added to match-v5 in patch 11.20 on Oct 5th, 2021.
 * @param gameId -
 * @param gameMode - Refer to the Game Constants documentation.
 * @param gameName -
 * @param gameStartTimestamp - Unix timestamp for when match starts on the game server.
 * @param gameType -
 * @param gameVersion - The first two parts can be used to determine the patch a game was played on.
 * @param mapId - Refer to the Game Constants documentation.
 * @param participants -
 * @param platformId - Platform where the match was played.
 * @param queueId - Refer to the Game Constants documentation.
 * @param teams -
 * @param tournamentCode - Tournament code used to generate the match. This field was added to match-v5 in patch 11.13 on June 23rd, 2021.
 */
type InfoDto = {
	gameCreation: number;
	gameDuration: number;
	gameEndTimestamp: number;
	gameId: number;
	gameMode: string;
	gameName: string;
	gameStartTimestamp: number;
	gameType: string;
	gameVersion: string;
	mapId: number;
	participants: ParticipantDto[];
	platformId: string;
	queueId: number;
	teams: TeamDto[];
	tournamentCode: string;
};
/**
 * @param assists -
 * @param baronKills -
 * @param bountyLevel -
 * @param champExperience -
 * @param champLevel -
 * @param championId - Prior to patch 11.4, on Feb 18th, 2021, this field returned invalid championIds. We recommend determining the champion based on the championName field for matches played prior to patch 11.4.
 * @param championName -
 * @param championTransform - This field is currently only utilized for Kayn's transformations. (Legal values: 0 - None, 1 - Slayer, 2 - Assassin)
 * @param consumablesPurchased -
 * @param damageDealtToBuildings -
 * @param damageDealtToObjectives -
 * @param damageDealtToTurrets -
 * @param damageSelfMitigated -
 * @param deaths -
 * @param detectorWardsPlaced -
 * @param doubleKills -
 * @param dragonKills -
 * @param firstBloodAssist -
 * @param firstBloodKill -
 * @param firstTowerAssist -
 * @param firstTowerKill -
 * @param gameEndedInEarlySurrender -
 * @param gameEndedInSurrender -
 * @param goldEarned -
 * @param goldSpent -
 * @param individualPosition - Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field.
 * @param inhibitorKills -
 * @param inhibitorTakedowns -
 * @param inhibitorsLost -
 * @param item0 -
 * @param item1 -
 * @param item2 -
 * @param item3 -
 * @param item4 -
 * @param item5 -
 * @param item6 -
 * @param itemsPurchased -
 * @param killingSprees -
 * @param kills -
 * @param lane -
 * @param largestCriticalStrike -
 * @param largestKillingSpree -
 * @param largestMultiKill -
 * @param numberestTimeSpentLiving -
 * @param magicDamageDealt -
 * @param magicDamageDealtToChampions -
 * @param magicDamageTaken -
 * @param neutralMinionsKilled -
 * @param nexusKills -
 * @param nexusTakedowns -
 * @param nexusLost -
 * @param objectivesStolen -
 * @param objectivesStolenAssists -
 * @param participantId -
 * @param pentaKills -
 * @param perks -
 * @param physicalDamageDealt -
 * @param physicalDamageDealtToChampions -
 * @param physicalDamageTaken -
 * @param profileIcon -
 * @param puuid -
 * @param quadraKills -
 * @param riotIdName -
 * @param riotIdTagline -
 * @param role -
 * @param sightWardsBoughtInGame -
 * @param spell1Casts -
 * @param spell2Casts -
 * @param spell3Casts -
 * @param spell4Casts -
 * @param summoner1Casts -
 * @param summoner1Id -
 * @param summoner2Casts -
 * @param summoner2Id -
 * @param summonerId -
 * @param summonerLevel -
 * @param summonerName -
 * @param teamEarlySurrendered -
 * @param teamId -
 * @param teamPosition - Both individualPosition and teamPosition are computed by the game server and are different versions of the most likely position played by a player. The individualPosition is the best guess for which position the player actually played in isolation of anything else. The teamPosition is the best guess for which position the player actually played if we add the constraint that each team must have one top player, one jungle, one middle, etc. Generally the recommendation is to use the teamPosition field over the individualPosition field.
 * @param timeCCingOthers -
 * @param timePlayed -
 * @param totalDamageDealt -
 * @param totalDamageDealtToChampions -
 * @param totalDamageShieldedOnTeammates -
 * @param totalDamageTaken -
 * @param totalHeal -
 * @param totalHealsOnTeammates -
 * @param totalMinionsKilled -
 * @param totalTimeCCDealt -
 * @param totalTimeSpentDead -
 * @param totalUnitsHealed -
 * @param tripleKills -
 * @param trueDamageDealt -
 * @param trueDamageDealtToChampions -
 * @param trueDamageTaken -
 * @param turretKills -
 * @param turretTakedowns -
 * @param turretsLost -
 * @param unrealKills -
 * @param visionScore -
 * @param visionWardsBoughtInGame -
 * @param wardsKilled -
 * @param wardsPlaced -
 * @param win -
 */
type ParticipantDto = {
	assists: number;
	baronKills: number;
	bountyLevel: number;
	champExperience: number;
	champLevel: number;
	championId: number;
	championName: string;
	championTransform: number;
	consumablesPurchased: number;
	damageDealtToBuildings: number;
	damageDealtToObjectives: number;
	damageDealtToTurrets: number;
	damageSelfMitigated: number;
	deaths: number;
	detectorWardsPlaced: number;
	doubleKills: number;
	dragonKills: number;
	firstBloodAssist: boolean;
	firstBloodKill: boolean;
	firstTowerAssist: boolean;
	firstTowerKill: boolean;
	gameEndedInEarlySurrender: boolean;
	gameEndedInSurrender: boolean;
	goldEarned: number;
	goldSpent: number;
	individualPosition: string;
	inhibitorKills: number;
	inhibitorTakedowns: number;
	inhibitorsLost: number;
	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	itemsPurchased: number;
	killingSprees: number;
	kills: number;
	lane: string;
	largestCriticalStrike: number;
	largestKillingSpree: number;
	largestMultiKill: number;
	numberestTimeSpentLiving: number;
	magicDamageDealt: number;
	magicDamageDealtToChampions: number;
	magicDamageTaken: number;
	neutralMinionsKilled: number;
	nexusKills: number;
	nexusTakedowns: number;
	nexusLost: number;
	objectivesStolen: number;
	objectivesStolenAssists: number;
	participantId: number;
	pentaKills: number;
	perks: PerksDto;
	physicalDamageDealt: number;
	physicalDamageDealtToChampions: number;
	physicalDamageTaken: number;
	profileIcon: number;
	puuid: string;
	quadraKills: number;
	riotIdName: string;
	riotIdTagline: string;
	role: string;
	sightWardsBoughtInGame: number;
	spell1Casts: number;
	spell2Casts: number;
	spell3Casts: number;
	spell4Casts: number;
	summoner1Casts: number;
	summoner1Id: number;
	summoner2Casts: number;
	summoner2Id: number;
	summonerId: string;
	summonerLevel: number;
	summonerName: string;
	teamEarlySurrendered: boolean;
	teamId: number;
	teamPosition: string;
	timeCCingOthers: number;
	timePlayed: number;
	totalDamageDealt: number;
	totalDamageDealtToChampions: number;
	totalDamageShieldedOnTeammates: number;
	totalDamageTaken: number;
	totalHeal: number;
	totalHealsOnTeammates: number;
	totalMinionsKilled: number;
	totalTimeCCDealt: number;
	totalTimeSpentDead: number;
	totalUnitsHealed: number;
	tripleKills: number;
	trueDamageDealt: number;
	trueDamageDealtToChampions: number;
	trueDamageTaken: number;
	turretKills: number;
	turretTakedowns: number;
	turretsLost: number;
	unrealKills: number;
	visionScore: number;
	visionWardsBoughtInGame: number;
	wardsKilled: number;
	wardsPlaced: number;
	win: boolean;
};
/**
 * @param statPerks -
 * @param styles -
 */
type PerksDto = {
	statPerks: PerkStatsDto;
	styles: PerkStyleDto[];
};
/**
 * @param defense -
 * @param flex -
 * @param offense -
 */
type PerkStatsDto = {
	defense: number;
	flex: number;
	offense: number;
};
/**
 * @param description -
 * @param selections -
 * @param style -
 */
type PerkStyleDto = {
	description: string;
	selections: PerkStyleSelectionDto[];
	style: number;
};
/**
 * @param perk -
 * @param var1 -
 * @param var2 -
 * @param var3 -
 */
type PerkStyleSelectionDto = {
	perk: number;
	var1: number;
	var2: number;
	var3: number;
};
/**
 * @param bans -
 * @param objectives -
 * @param teamId -
 * @param win -
 */
type TeamDto = {
	bans: BanDto[];
	objectives: ObjectivesDto;
	teamId: number;
	win: boolean;
};
/**
 * @param championId -
 * @param pickTurn -
 */
type BanDto = {
	championId: number;
	pickTurn: number;
};
/**
 * @param baron -
 * @param champion -
 * @param dragon -
 * @param inhibitor -
 * @param riftHerald -
 * @param tower -
 */
type ObjectivesDto = {
	baron: ObjectiveDto;
	champion: ObjectiveDto;
	dragon: ObjectiveDto;
	inhibitor: ObjectiveDto;
	riftHerald: ObjectiveDto;
	tower: ObjectiveDto;
};
/**
 * @param first -
 * @param kills -
 */
type ObjectiveDto = {
	first: boolean;
	kills: number;
};

type QueueData = {
	id: number;
	name: string;
	shortName: string;
	description: string;
	detailedDescription: string;
	gameSelectModeGroup: GameSelectModeGroup;
	gameSelectCategory: GameSelectCategory;
	gameSelectPriority: number;
	isSkillTreeQueue: boolean;
	isLimitedTimeQueue: boolean;
	isBotHonoringAllowed: boolean;
	hidePlayerPosition: boolean;
	viableChampionRoster: number[];
};

type GameSelectCategory = 'kPvP' | 'kCustom' | 'kVersusAI';

type GameSelectModeGroup =
	| 'kAlternativeLeagueGameModes'
	| 'kTeamfightTactics'
	| 'kARAM'
	| 'kSummonersRift';

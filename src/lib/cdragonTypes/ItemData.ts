type ItemData = {
	id: number;
	name: string;
	description: string;
	active: boolean;
	inStore: boolean;
	from: number[];
	to: number[];
	categories: Category[];
	maxStacks: number;
	requiredChampion: RequiredChampion;
	requiredAlly: string;
	requiredBuffCurrencyName: RequiredBuffCurrencyName;
	requiredBuffCurrencyCost: number;
	specialRecipe: number;
	isEnchantment: boolean;
	price: number;
	priceTotal: number;
	displayInItemSets: boolean;
	iconPath: string;
};

type Category =
	| 'Boots'
	| 'ManaRegen'
	| 'HealthRegen'
	| 'Health'
	| 'CriticalStrike'
	| 'SpellDamage'
	| 'Mana'
	| 'Armor'
	| 'SpellBlock'
	| 'LifeSteal'
	| 'SpellVamp'
	| 'Jungle'
	| 'Damage'
	| 'Lane'
	| 'AttackSpeed'
	| 'OnHit'
	| 'Trinket'
	| 'Active'
	| 'Tenacity'
	| 'MagicPenetration'
	| 'MagicResist'
	| 'AbilityHaste'
	| 'Consumable'
	| 'CooldownReduction'
	| 'ArmorPenetration'
	| 'Stealth'
	| 'Vision'
	| 'NonbootsMovement'
	| 'Aura'
	| 'Slow'
	| 'GoldPer';

type RequiredBuffCurrencyName =
	| ''
	| 'UltbookSmitePassive'
	| 'Item2420'
	| 'Feats_NoxianBootPurchaseBuff'
	| 'Feats_SpecialQuestBootBuff'
	| 'SupportItemPurchaseBuff'
	| 'S11Support_Quest_Completion_Buff'
	| 'GangplankBilgewaterToken';

type RequiredChampion = '' | 'FiddleSticks' | 'Kalista' | 'Sylas' | 'Gangplank';

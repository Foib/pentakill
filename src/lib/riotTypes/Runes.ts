type RunePath = {
	id: number;
	key: string;
	icon: string;
	name: string;
	slots: RuneSlot[];
};

type RuneSlot = {
	runes: Rune[];
};

type Rune = {
	id: number;
	key: string;
	icon: string;
	name: string;
	shortDesc: string;
	longDesc: string;
};

let RIOT_API_KEY: string | undefined;

if (Bun.env.NODE_ENV === 'production') {
	RIOT_API_KEY = Bun.env.RIOT_API_KEY;
} else {
	RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
}

export const load = async () => {
	let summoners: SummonerDto[] = [];

	return {
		summoners
	};
};

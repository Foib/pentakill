import { env } from '$env/dynamic/private';

export const load = async () => {
	let summoners: SummonerDto[] = [];

	return {
		summoners
	};
};

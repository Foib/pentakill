import getRegion from '$lib/getRegion.js';
import getSummonerIcon from '$lib/getSummonerIcon.js';
import type { isRiotStatusCode, CustomMatchDto, RiotStatusCode } from '$lib/riotTypes/Misc.js';
import { error, redirect } from '@sveltejs/kit';

let RIOT_API_KEY: string | undefined;

if (process.env.NODE_ENV === 'production') {
	RIOT_API_KEY = process.env.RIOT_API_KEY;
} else {
	RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
}

export const load = async ({ params }) => {
	const userArr = params.slug.split(';');

	let summoners: SummonerDto[] = [];

	for (let i = 0; i < userArr.length; i++) {}

	return {
		summoners
	};
};

async function getSummonerData(region: string, username: string) {
	const summonerDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${RIOT_API_KEY}`
	);
	const summonerData: SummonerDto | RiotStatusCode = await summonerDataJson.json();
	return summonerData;
}

type SummonerExtended = {
	summonerData: SummonerDto;
	iconUrl: string;
	rankData: any;
};

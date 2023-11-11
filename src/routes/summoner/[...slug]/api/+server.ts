import getRegion from '$lib/getRegion.js';
import { isRiotStatusCode, type CustomMatchDto, type RiotStatusCode } from '$lib/riotTypes/Misc.js';
import { json } from '@sveltejs/kit';

let RIOT_API_KEY: string | undefined;

if (process.env.NODE_ENV === 'production') {
	RIOT_API_KEY = process.env.RIOT_API_KEY;
} else {
	RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
}

export async function GET(event) {
	const _region = event.url.searchParams.get('region');
	const username = event.url.searchParams.get('username');
	const startIndex = parseInt(event.url.searchParams.get('startIndex') ?? '0');

	if (!_region || !username) {
		return json({ message: 'Not Found', status: 404 });
	}

	const region = getRegion(_region);

	if (region[0] === '') {
		return json({ message: 'Not Found', status: 404 });
	}

	const matches = await getSummonerData(region[0], username).then(async (summonerData) => {
		if (isRiotStatusCode(summonerData)) {
			return json({ message: 'Not Found', status: 404 });
		}

		return getMatchIds(region[1], summonerData.puuid, startIndex).then(async (matchData) => {
			isRiotStatusCode(matchData);

			let matchPromises: Promise<CustomMatchDto>[] = [];
			matchData.forEach((matchId: string) => {
				matchPromises.push(getMatchData(region[1], matchId, summonerData));
			});

			return await Promise.all(matchPromises);
		});
	});

	return json({ matches });
}

async function getSummonerData(region: string, username: string) {
	const summonerDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${RIOT_API_KEY}`
	);
	const summonerData: SummonerDto | RiotStatusCode = await summonerDataJson.json();
	return summonerData;
}

async function getMatchIds(region: string, puuid: string, startIndex: number) {
	const matchDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${startIndex}&count=10&api_key=${RIOT_API_KEY}`
	);
	const matchData: string[] = await matchDataJson.json();
	return matchData;
}

async function getMatchData(region: string, matchId: string, summonerData: any) {
	const matchDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`
	);
	const matchData: CustomMatchDto = await matchDataJson.json();
	matchData.info.participants.forEach((participant: any) => {
		if (participant.puuid === summonerData.puuid) {
			matchData.currentSummoner = participant;
		}
	});
	return matchData;
}

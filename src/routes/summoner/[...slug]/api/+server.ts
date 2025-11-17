import getRegion from '$lib/getRegion.js';
import { isRiotStatusCode, type CustomMatchDto, type RiotStatusCode } from '$lib/riotTypes/Misc.js';
import type { MatchV5TimelineDTOs } from 'twisted/dist/models-dto';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET(event) {
	const _region = event.url.searchParams.get('region');
	const puuid = event.url.searchParams.get('puuid');
	const startIndex = parseInt(event.url.searchParams.get('startIndex') ?? '0');

	if (!_region || !puuid) {
		return json({ message: 'Not Found', status: 404 });
	}

	const region = getRegion(_region);
	if (region[0] === '') {
		return json({ message: 'Not Found', status: 404 });
	}

	const matches = await getSummonerData(region[0], puuid, env.VITE_RIOT_API_KEY).then(
		async (summonerData) => {
			if (isRiotStatusCode(summonerData)) {
				return json({ message: 'Not Found', status: 404 });
			}

			return getMatchIds(region[1], summonerData.puuid, startIndex, env.VITE_RIOT_API_KEY).then(
				async (matchData) => {
					isRiotStatusCode(matchData);

					let matchPromises: Promise<CustomMatchDto>[] = [];
					matchData.forEach((matchId: string) => {
						matchPromises.push(
							getMatchData(region[1], matchId, summonerData, env.VITE_RIOT_API_KEY)
						);
					});

					return await Promise.all(matchPromises);
				}
			);
		}
	);

	return json({ matches });
}

async function getSummonerData(region: string, puuid: string, api_key: string) {
	const summonerDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
	);
	const summonerData: SummonerDto | RiotStatusCode = await summonerDataJson.json();
	return summonerData;
}

async function getMatchIds(region: string, puuid: string, startIndex: number, api_key: string) {
	const matchDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${startIndex}&count=5&api_key=${api_key}`
	);
	const matchData: string[] = await matchDataJson.json();

	return matchData;
}

async function getMatchData(region: string, matchId: string, summonerData: any, api_key: string) {
	const matchDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${api_key}`
	);
	const matchData: CustomMatchDto = await matchDataJson.json();

	const matchTimelineJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=${api_key}`
	);
	const matchTimelineData: MatchV5TimelineDTOs.MatchTimelineDto = await matchTimelineJson.json();

	matchData.info.participants.forEach((participant: any) => {
		if (participant.puuid === summonerData.puuid) {
			matchData.currentSummoner = participant;
		}
	});

	matchData.timeline = matchTimelineData;

	return matchData;
}

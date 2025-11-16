import getRegion from '$lib/getRegion.js';
import { getRiotAccount } from '$lib/getRiotAccount';
import getSummonerIconUrl from '$lib/getSummonerIconUrl.js';
import { isRiotStatusCode, type CustomMatchDto, type RiotStatusCode } from '$lib/riotTypes/Misc.js';
import type { MatchV5TimelineDTOs } from 'twisted/dist/models-dto';
import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const load = async ({ params, fetch }) => {
	if (!env.VITE_RIOT_API_KEY) {
		throw error(500, 'Server misconfiguration: Riot API key is missing');
	}

	const slugArr = params.slug.split('/', 2);
	const region = getRegion(slugArr[0]);

	const usernameTagArr = slugArr[1].split('-', 2);
	const username = usernameTagArr[0];
	const tag = usernameTagArr[1];

	let summonerIconUrl: string;
	let rankData: LeagueEntryDTO[];
	let matchPromises: Promise<CustomMatchDto>[] = [];

	if (region[0] === '' || !username || tag === '') {
		throw error(404, 'Not Found');
	}

	const riotAccountData = await getRiotAccount(fetch, username, tag, env.VITE_RIOT_API_KEY);

	const data = await getSummonerData(region[0], riotAccountData.puuid, env.VITE_RIOT_API_KEY).then(
		async (summonerData) => {
			if (isRiotStatusCode(summonerData)) {
				throw error(500, 'Error fetching summoner data');
			}

			summonerIconUrl = getSummonerIconUrl(summonerData.profileIconId);
			rankData = await getRankData(region[0], summonerData.puuid, env.VITE_RIOT_API_KEY);
			await getMatchIds(region[1], summonerData.puuid, env.VITE_RIOT_API_KEY).then(
				async (matchData) => {
					isRiotStatusCode(matchData);

					matchData.forEach((matchId: string) => {
						matchPromises.push(
							getMatchData(region[1], matchId, summonerData, env.VITE_RIOT_API_KEY)
						);
					});
				}
			);

			return {
				region: slugArr[0],
				summonerIconUrl,
				riotAccountData,
				summonerData,
				rankData,
				matches: await Promise.all(matchPromises)
			};
		}
	);

	if (isRiotStatusCode(data.summonerData) && data.summonerData.status.status_code === 404) {
		throw redirect(302, '/');
	} else {
		return {
			data,
			slug: params.slug
		};
	}
};

async function getSummonerData(region: string, puuid: string, api_key: string) {
	const summonerDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${api_key}`
	);
	const summonerData: SummonerDto | RiotStatusCode = await summonerDataJson.json();
	return summonerData;
}

async function getRankData(region: string, puuid: string, api_key: string) {
	const rankData = await fetch(
		`https://${region}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}?api_key=${api_key}`
	);
	const rankDataJson = await rankData.json();
	return rankDataJson as LeagueEntryDTO[];
}

async function getMatchIds(region: string, puuid: string, api_key: string) {
	const matchDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=2&api_key=${api_key}`
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

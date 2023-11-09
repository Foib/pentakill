import getRegion from '$lib/getRegion.js';
import { isRiotStatusCode, type CustomMatchDto, type RiotStatusCode } from '$lib/riotTypes/Misc.js';
import { error, redirect } from '@sveltejs/kit';

let RIOT_API_KEY: string | undefined;

if (process.env.NODE_ENV === 'production') {
	RIOT_API_KEY = process.env.RIOT_API_KEY;
} else {
	RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
}

export const load = async ({ params }) => {
	const slugArr = params.slug.split('/', 2);
	const region = getRegion(slugArr[0]);
	const username = slugArr[1];

	if (!region || !username) {
		throw error(404, 'Not Found');
	}

	const data = await getSummonerData(region[0], username).then((summonerData) => {
		if (isRiotStatusCode(summonerData)) {
			throw error(404, 'Not Found');
		}

		return getRankData(region[0], summonerData.id).then((rankData) => {
			checkIfStatusIsError(rankData);

			return getMatchIds(region[1], summonerData.puuid).then((matchData) => {
				checkIfStatusIsError(matchData);

				let matchPromises: Promise<CustomMatchDto>[] = [];
				matchData.forEach((matchId: string) => {
					matchPromises.push(getMatchData(region[1], matchId, summonerData));
				});

				return {
					summonerData,
					rankData,
					matches: Promise.all(matchPromises)
				};
			});
		});
	});

	if (isRiotStatusCode(data.summonerData) && data.summonerData.status.status_code === 404) {
		throw redirect(302, '/');
	} else {
		return {
			data,
			slug: params.slug
		};
	}
};

function checkIfStatusIsError(data: any) {
	if (data.status?.status_code === 404) {
		throw error(404, 'Not Found');
	}
}

async function getSummonerData(region: string, username: string) {
	const summonerDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${RIOT_API_KEY}`
	);
	const summonerData: SummonerDto | RiotStatusCode = await summonerDataJson.json();
	return summonerData;
}

async function getRankData(region: string, summonerId: string) {
	const rankData = await fetch(
		`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`
	);
	const rankDataJson = await rankData.json();
	return rankDataJson;
}

async function getMatchIds(region: string, puuid: string) {
	const matchDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${RIOT_API_KEY}`
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

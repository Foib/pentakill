import getRegion from '$lib/getRegion.js';
import { redirect } from '@sveltejs/kit';

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

	const data = await getSummonerData(region[0], username).then((summonerData) => {
		return getRankData(region[0], summonerData.id).then((rankData) => {
			return getMatchIds(region[1], summonerData.puuid).then((matchData) => {
				let matchPromises: Promise<any>[] = [];
				matchData.forEach((matchId: string) => {
					matchPromises.push(getMatchData(region[1], matchId));
				});

				return {
					summonerData,
					rankData,
					matches: Promise.all(matchPromises).then((matches) => {
						//write in every match if the player won or lost
						matches.forEach((match) => {
							match.info.participants.forEach((participant: any) => {
								if (participant.puuid === summonerData.puuid) {
									match.currentSummoner = participant;
								}
							});
						});

						return matches;
					})
				};
			});
		});
	});

	if (data.summonerData.status?.status_code === 404) {
		throw redirect(302, '/');
	} else {
		return {
			data,
			slug: params.slug
		};
	}
};

async function getSummonerData(region: string, username: string) {
	const summonerData = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${RIOT_API_KEY}`
	);
	const summonerDataJson = await summonerData.json();
	return summonerDataJson;
}

async function getRankData(region: string, summonerId: string) {
	const rankData = await fetch(
		`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${RIOT_API_KEY}`
	);
	const rankDataJson = await rankData.json();
	return rankDataJson;
}

async function getMatchIds(region: string, puuid: string) {
	const matchData = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${RIOT_API_KEY}`
	);
	const matchDataJson = await matchData.json();
	return matchDataJson;
}

async function getMatchData(region: string, matchId: string) {
	const matchData = await fetch(
		`https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`
	);
	const matchDataJson = await matchData.json();
	return matchDataJson;
}

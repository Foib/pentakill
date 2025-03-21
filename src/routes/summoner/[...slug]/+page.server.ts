import getRegion from '$lib/getRegion.js';
import getSummonerIcon from '$lib/getSummonerIcon.js';
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

	const usernameTagArr = slugArr[1].split('-', 2);
	const username = usernameTagArr[0];
	const tag = usernameTagArr[1];

	let summonerIconUrl: string;

	if (region[0] === '' || !username || tag === '') {
		throw error(404, 'Not Found');
	}

	const riotAccountData = await getRiotAccount(username, tag);
	const data = await getSummonerData(region[0], riotAccountData.puuid).then(
		async (summonerData) => {
			if (isRiotStatusCode(summonerData)) {
				console.log(summonerData);
				throw error(404, 'Not Found');
			}

			await getSummonerIcon(summonerData.profileIconId).then((icon) => {
				summonerIconUrl = icon;
			});

			return getRankData(region[0], summonerData.id).then((rankData) => {
				isRiotStatusCode(rankData);

				return getMatchIds(region[1], summonerData.puuid).then(async (matchData) => {
					isRiotStatusCode(matchData);

					let matchPromises: Promise<CustomMatchDto>[] = [];
					matchData.forEach((matchId: string) => {
						matchPromises.push(getMatchData(region[1], matchId, summonerData));
					});

					return {
						region: slugArr[0],
						summonerIconUrl,
						riotAccountData,
						summonerData,
						rankData,
						matches: await Promise.all(matchPromises)
					};
				});
			});
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

async function getRiotAccount(name: string, tag: string) {
	const acountDataJson = await fetch(
		`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}?api_key=${RIOT_API_KEY}`
	);
	return (await acountDataJson.json()) as AccountDto;
}

async function getSummonerData(region: string, puuid: string) {
	const summonerDataJson = await fetch(
		`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`
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

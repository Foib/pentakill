import { redirect } from '@sveltejs/kit';

let RIOT_API_KEY: string | undefined;

if (process.env.NODE_ENV === 'production') {
	RIOT_API_KEY = process.env.RIOT_API_KEY;
} else {
	RIOT_API_KEY = import.meta.env.VITE_RIOT_API_KEY;
}

export const load = async ({ params }) => {
	const slugArr = params.slug.split('/', 2);
	const region = slugArr[0];
	const username = slugArr[1];

	const data = await getSummonerData(region, username).then((summonerData) => {
		return getRankData(region, summonerData.id).then((rankData) => {
			return { summonerData, rankData };
		});
	});

	console.log(data);

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

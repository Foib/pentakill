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

    if (!_region || !username) {
        return json({ message: 'Not Found', status: 404 });
    }

    const region = getRegion(_region);

    if (region[0] === '') {
        return json({ message: 'Not Found', status: 404 });
    }

    const data = await getSummonerData(region[0], username).then(async (summonerData) => {
        if (isRiotStatusCode(summonerData) && summonerData.status.status_code === 404) {
            console.log('Summoner not found');
            return { message: 'Not Found', status: 404 };
        }

        return { summonerData, status: 200 };
    }
    );

    return json(data);
}

async function getSummonerData(region: string, username: string) {
    const summonerDataJson = await fetch(
        `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${RIOT_API_KEY}`
    );
    const summonerData: SummonerDto | RiotStatusCode = await summonerDataJson.json();
    return summonerData;
}
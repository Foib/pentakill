import getRegion from '$lib/getRegion.js';
import { getRiotAccount } from '$lib/getRiotAccount';
import getSummonerIconUrl from '$lib/getSummonerIconUrl.js';
import { isRiotStatusCode, type CustomMatchDto, type RiotStatusCode } from '$lib/riotTypes/Misc.js';
import type { MatchV5DTOs, MatchV5TimelineDTOs } from 'twisted/dist/models-dto';
import { error, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { type Canvas, createCanvas, loadImage } from '@napi-rs/canvas';
import getRankedQueueName from '$lib/getRankedQueueName.js';
import { S3Client } from 'bun';
import { formatRankText } from '$lib/formatRankText';

type Data = {
	region: string;
	summonerIconUrl: string;
	riotAccountData: AccountDto;
	summonerData: SummonerDto;
	rankData: LeagueEntryDTO[];
	matches: (MatchV5DTOs.MatchDto & {
		timeline: MatchV5TimelineDTOs.MatchTimelineDto;
	} & {
		currentSummoner: MatchV5DTOs.ParticipantDto;
	})[];
};

if (!env.VITE_BACKBLAZE_KEY || !env.VITE_BACKBLAZE_KEY_ID) {
	throw error(500, 'Server misconfiguration: Backblaze application keys are missing');
}

const b2client = new S3Client({
	accessKeyId: env.VITE_BACKBLAZE_KEY_ID,
	secretAccessKey: env.VITE_BACKBLAZE_KEY,
	bucket: 'pentakill',
	endpoint: 'https://s3.us-east-005.backblazeb2.com'
});

export const load = async ({ params, fetch, request }) => {
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

	const data: Data = await getSummonerData(
		region[0],
		riotAccountData.puuid,
		env.VITE_RIOT_API_KEY
	).then(async (summonerData) => {
		if (isRiotStatusCode(summonerData)) {
			throw error(500, 'Error fetching summoner data');
		}

		summonerIconUrl = getSummonerIconUrl(summonerData.profileIconId);
		rankData = await getRankData(region[0], summonerData.puuid, env.VITE_RIOT_API_KEY);
		await getMatchIds(region[1], summonerData.puuid, env.VITE_RIOT_API_KEY).then(
			async (matchData) => {
				if (isRiotStatusCode(matchData)) {
					throw error(500, 'Error fetching match data');
				}

				matchData.forEach((matchId: string) => {
					matchPromises.push(getMatchData(region[1], matchId, summonerData, env.VITE_RIOT_API_KEY));
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
	});

	if (isRiotStatusCode(data.summonerData) && data.summonerData.status.status_code === 404) {
		throw redirect(302, '/');
	}

	const userAgent = request.headers.get('user-agent') || '';
	let image = '';
	if (userAgent.includes('Discordbot')) {
		image = data.summonerIconUrl;
	} else {
		image = await generateMetaImageDefault(data);
	}

	return {
		data,
		image,
		slug: params.slug
	};
};

async function generateMetaImageDefault(data: Data) {
	const imageType = 'jpeg';
	const b2FilePath = `summoner_meta_image/${data.riotAccountData.puuid}.${imageType}`;
	const b2FileUrl = `https://f005.backblazeb2.com/file/pentakill/${b2FilePath}`;

	const file = b2client.file(b2FilePath);

	if (await file.exists()) {
		const fileStat = await file.stat();
		const diff = new Date().getTime() - fileStat.lastModified.getTime();
		const diffHours = diff / (1000 * 60 * 60);

		if (diffHours < 24) {
			return b2FileUrl;
		}
	}

	const canvas = createCanvas(400, 400);
	const ctx = canvas.getContext('2d');

	await loadImage(data.summonerIconUrl).then((image) => {
		if (!ctx) {
			throw error(500, 'Error creating image context');
		}

		ctx.drawImage(image, 0, 0, 400, 400);
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(0, 0, 400, 400);

		const fontFamily =
			"'Noto Sans', 'Noto Sans Arabic', 'Noto Sans JP', 'Noto Sans KR', 'Noto Sans SC', 'Noto Sans Syriac Western', 'Noto Sans Thai', sans-serif";
		ctx.font = 'bold 40px ' + fontFamily;
		ctx.shadowColor = 'black';
		ctx.shadowBlur = 4;
		ctx.textBaseline = 'middle';

		ctx.fillStyle = '#f0e6d2';
		ctx.fillText(data.riotAccountData.gameName, 20, 125);
		ctx.fillStyle = '#a09b8c';
		ctx.fillText('#' + data.riotAccountData.tagLine, 20, 165);

		let y = 205;
		for (const rankData of data.rankData) {
			ctx.font = '18px ' + fontFamily;
			ctx.fillStyle = '#f0e6d2';
			ctx.fillText(getRankedQueueName(rankData.queueType), 20, y);
			y += 25;

			ctx.font = 'bold 24px ' + fontFamily;

			const rankText = formatRankText(rankData.tier, rankData.rank);
			const textMetrics = ctx.measureText(rankText);
			const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

			switch (rankData.tier) {
				case 'IRON':
					ctx.fillStyle = '#827070';
					break;
				case 'BRONZE':
					ctx.fillStyle = '#ed8926';
					break;
				case 'SILVER':
					ctx.fillStyle = '#cfcfcf';
					break;
				case 'GOLD':
					ctx.fillStyle = '#ffc400';
					break;
				case 'PLATINUM':
					ctx.fillStyle = '#00ffee';
					break;
				case 'EMERALD':
					ctx.fillStyle = '#12ff61';
					break;
				case 'DIAMOND':
					ctx.fillStyle = '#1971ff';
					break;
				case 'MASTER':
					ctx.fillStyle = '#9f0dbf';
					break;
				case 'GRANDMASTER':
					ctx.fillStyle = '#ff2212';
					break;
				case 'CHALLENGER':
					const grd = ctx.createLinearGradient(0, y - textHeight / 2, 0, y + textHeight / 2);
					grd.addColorStop(0.1, '#F7BA2C');
					grd.addColorStop(0.9, '#EA5459');
					ctx.fillStyle = grd;
					break;
				default:
					ctx.fillStyle = '#ffffff';
			}

			ctx.fillText(rankText, 20, y);

			y += 30;
		}
	});

	const buffer = canvas.toBuffer(`image/${imageType}`, 90);

	await file.write(buffer, {
		type: `image/${imageType}`,
		acl: 'public-read'
	});

	return b2FileUrl;
}

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
		`https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${api_key}`
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

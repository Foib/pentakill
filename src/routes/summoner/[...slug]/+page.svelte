<script lang="ts">
	import type { CustomMatchDto } from '$lib/riotTypes/Misc.js';
	import { onMount } from 'svelte';
	import { storesInitialized } from '../../../stores.js';
	import MatchHistoryItem from '../../../components/matchHistory/MatchHistoryItem.svelte';
	import SocialMediaMetaTags from '../../../components/SocialMediaMetaTags.svelte';
	import getRankedQueueName from '$lib/getRankedQueueName.js';
	import spinner from '$lib/assets/spinner.png';

	export let data;

	let matches: CustomMatchDto[] | null = null;
	let loadingMatches = false;

	onMount(() => {
		matches = data.data.matches;
		document.title = `${data.data.riotAccountData.gameName}#${data.data.riotAccountData.tagLine} - PENTAKILL.LOL`;
	});

	function loadMoreMatches() {
		loadingMatches = true;

		const startIndex = matches?.length || 0;

		console.log(startIndex);

		fetch(
			`./api?region=${data.data.region}&puuid=${data.data.summonerData.puuid}&startIndex=${startIndex}`
		)
			.then((res) => res.json())
			.then((d) => {
				console.log(d);

				if (matches) {
					matches = [...matches, ...d.matches];
				}

				loadingMatches = false;
			});
	}
</script>

<SocialMediaMetaTags
	description={`${data.data.riotAccountData.gameName}#${
		data.data.riotAccountData.tagLine
	} | Level ${data.data.summonerData.summonerLevel} | ${data.data.rankData
		.map((r) => `${getRankedQueueName(r.queueType)}: ${r.tier} ${r.rank}`)
		.join(' | ')}`}
	url={`https://www.pentakill.lol/summoner/${data.data.region}/${data.data.riotAccountData.gameName}-${data.data.riotAccountData.tagLine}`}
	image={data.data.summonerIconUrl}
/>

{#if $storesInitialized}
	<main class="min-h-main-height flex justify-center font-spiegel">
		<div class="my-8 flex w-[800px] flex-col rounded-xl border border-league-grey-2">
			<div class="flex flex-row gap-8 p-4 pb-0">
				<div class="mb-8 h-32 w-32 shrink-0">
					<div
						class="overflow-hidden rounded-full bg-linear-to-t from-league-gold-5 to-league-gold-4"
					>
						<div class="p-1">
							<img src={data.data.summonerIconUrl} alt="Summoner Icon" class="rounded-full" />
						</div>
					</div>
					<div class="absolute flex h-6 w-32 -translate-y-1/2 items-center justify-center">
						<span
							class="rounded-full border-4 border-league-hextech-black bg-linear-to-r from-league-blue-4 to-league-blue-2 px-2 text-lg font-bold text-league-hextech-black"
						>
							{data.data.summonerData.summonerLevel}
						</span>
					</div>
				</div>

				<div class="flex w-full flex-col justify-between pb-2">
					<h1 class="font-beaufort text-4xl font-bold text-league-gold-1">
						{data.data.riotAccountData.gameName}
						<span class="text-league-grey-2">#{data.data.riotAccountData.tagLine}</span>
					</h1>
					<div class="flex w-full gap-16">
						{#each data.data.rankData as rankData}
							<div class="flex h-28 items-center gap-3">
								<div class="relative h-28 w-28">
									<!-- <img
										class="h-full"
										src="https://f005.backblazeb2.com/file/pentakill/rank_{rankData.tier.toLowerCase()}.png"
										alt="{rankData.tier.toLowerCase()} rank emblem"
									/> -->
									<video
										src="https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/videos/ranked/tier-promotion-to-{rankData.tier.toLowerCase()}.webm"
										autoplay
										muted
										controls={false}
										class="rank-anim pointer-events-none absolute top-1/2 left-1/2 aspect-video min-w-[460px] -translate-x-1/2 -translate-y-[calc(50%-4px)]"
									>
										<track kind="captions" />
									</video>
								</div>
								<div>
									<p class="font-beaufort text-xs font-bold text-league-grey-1">
										{getRankedQueueName(rankData.queueType)}
									</p>
									<p class="font-beaufort text-xl font-bold text-league-gold-1">
										{rankData.tier}
										{rankData.rank}
									</p>
									<p class="font-spiegel text-xs text-league-grey-1">
										{rankData.wins}W {rankData.losses}L | {rankData.leaguePoints} LP
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<hr class="border-league-grey-2" />
			<div class="grow p-4">
				{#if matches}
					<div class="flex flex-col gap-4">
						{#each matches as match, i}
							<MatchHistoryItem {match} />
							<hr class="border-league-grey-3" />
						{/each}
					</div>
				{:else}
					<div class="flex h-full items-center justify-center pl-8">
						<img src={spinner} alt="Loading" class="h-16 w-16 animate-spin" />
					</div>
				{/if}
			</div>
			{#if matches}
				<div class="mb-4 flex items-center justify-center">
					{#if loadingMatches}
						<img src={spinner} alt="Loading" class="m-2 h-16 w-16 animate-spin" />
					{:else}
						<button
							class="h-20 w-full font-beaufort text-2xl font-bold text-league-gold-1 opacity-50 transition-all hover:opacity-100"
							on:click={loadMoreMatches}
						>
							Load More
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</main>
{/if}

<style>
	.rank-anim {
		mask-image: radial-gradient(closest-side, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
	}
</style>

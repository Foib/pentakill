<script lang="ts">
	import type { CustomMatchDto } from '$lib/riotTypes/Misc.js';
	import { onMount } from 'svelte';
	import { storesInitialized } from '../../../stores.js';
	import MatchHistoryItem from '../../../components/matchHistory/MatchHistoryItem.svelte';
	import SocialMediaMetaTags from '../../../components/SocialMediaMetaTags.svelte';
	import getRankedQueueName from '$lib/getRankedQueueName.js';
	import spinner from '$lib/assets/spinner.png';
	import { page } from '$app/state';

	console.log(page.error);

	let { data } = $props();

	let matches = $state<CustomMatchDto[] | null>(null);
	let loadingMatches = $state(false);

	onMount(() => {
		document.title = `${data.data.riotAccountData.gameName}#${data.data.riotAccountData.tagLine} - PENTAKILL.LOL`;
		console.log(data.image);
	});

	$effect(() => {
		if (data.data.matches) {
			updateMatches();
		}
	});

	function updateMatches() {
		console.log('Updating matches');
		console.log(data.data.matches);
		matches = data.data.matches;
	}

	function loadMoreMatches() {
		loadingMatches = true;
		const startIndex = matches?.length || 0;

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

{#key data.data.summonerData.accountId}
	<SocialMediaMetaTags
		title={`${data.data.riotAccountData.gameName}#${data.data.riotAccountData.tagLine} | PENTAKILL.LOL`}
		description={`${data.data.riotAccountData.gameName}#${
			data.data.riotAccountData.tagLine
		} | Level ${data.data.summonerData.summonerLevel} | ${data.data.rankData
			.map((r) => `${getRankedQueueName(r.queueType)}: ${r.tier} ${r.rank}`)
			.join(' | ')}`}
		url={`https://www.pentakill.lol/summoner/${data.data.region}/${data.data.riotAccountData.gameName}-${data.data.riotAccountData.tagLine}`}
		image={data.image}
	/>

	{#if $storesInitialized}
		<main class="min-h-main-height justify-center font-spiegel md:flex">
			<div
				class="flex w-screen flex-col md:mt-8 md:mb-8 md:w-3xl md:rounded-xl md:border md:border-league-grey-2"
			>
				<div class="flex flex-row gap-4 p-4 pb-0 md:gap-8">
					<div class="size-20 shrink-0 md:size-32">
						<div
							class="overflow-hidden rounded-full bg-linear-to-t from-league-gold-5 to-league-gold-4"
						>
							<div class="p-0.5 sm:p-1">
								<img src={data.data.summonerIconUrl} alt="Summoner Icon" class="rounded-full" />
							</div>
						</div>
						<div
							class="absolute flex h-6 w-20 -translate-y-1/2 items-center justify-center md:w-32"
						>
							<span
								class="rounded-full border-2 border-league-hextech-black bg-linear-to-r from-league-blue-4 to-league-blue-2 px-2 text-sm font-bold text-league-hextech-black sm:border-4 sm:text-lg"
							>
								{data.data.summonerData.summonerLevel}
							</span>
						</div>
					</div>

					<div class="flex w-full flex-col justify-between pb-2">
						<h1 class="font-beaufort text-xl font-bold text-league-gold-1 sm:text-3xl md:text-4xl">
							{data.data.riotAccountData.gameName}
							<span class="text-league-grey-2">#{data.data.riotAccountData.tagLine}</span>
						</h1>
						<div class="flex w-full gap-4 md:gap-16">
							{#if data.data.rankData.length === 0}
								<div
									class="flex h-16 items-center font-beaufort text-4xl text-league-blue-6 sm:text-5xl md:h-28 md:text-6xl"
								>
									UNRANKED
								</div>
							{/if}

							{#each data.data.rankData as rankData}
								<div class="flex h-16 items-center gap-3 md:h-28">
									<div class="relative hidden size-16 sm:block md:size-28">
										<video
											src="https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-static-assets/global/default/videos/ranked/tier-promotion-to-{rankData.tier.toLowerCase()}.webm"
											autoplay
											muted
											controls={false}
											class="rank-anim pointer-events-none absolute top-1/2 left-1/2 aspect-video min-w-[280px] -translate-x-1/2 -translate-y-[calc(50%-4px)] md:min-w-[460px]"
										>
											<track kind="captions" />
										</video>
									</div>
									<div>
										<p class="font-beaufort text-xs font-bold text-league-grey-1">
											{getRankedQueueName(rankData.queueType)}
										</p>
										<p
											class="font-beaufort text-xs font-bold text-league-gold-1 sm:text-base md:text-xl"
										>
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
								<MatchHistoryItem {match} reload={data.data.summonerData.accountId} />
								<hr class="border-league-grey-3" />
							{/each}
						</div>
					{:else}
						<div class="flex h-full items-center justify-center">
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
								class="h-20 w-full cursor-pointer font-beaufort text-2xl font-bold text-league-gold-1 opacity-50 transition-all hover:opacity-100"
								onclick={loadMoreMatches}
							>
								Load More
							</button>
						{/if}
					</div>
				{/if}
			</div>
		</main>
	{/if}
{/key}

<style>
	.rank-anim {
		mask-image: radial-gradient(closest-side, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
	}
</style>

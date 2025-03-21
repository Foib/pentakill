<script lang="ts">
	import type { CustomMatchDto } from '$lib/riotTypes/Misc.js';
	import { onMount } from 'svelte';
	import { storesInitialized } from '../../../stores.js';
	import MatchHistoryItem from '../../../components/matchHistory/MatchHistoryItem.svelte';
	import SocialMediaMetaTags from '../../../components/SocialMediaMetaTags.svelte';
	import getRankedQueueName from '$lib/getRankedQueueName.js';

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
	<main class="flex justify-center font-spiegel min-h-[--main-height]">
		<div class="w-[800px] flex flex-col my-8 rounded-xl border border-league-grey-2">
			<div class="p-4 pb-0 flex flex-row gap-8">
				<div class="w-32 h-32 mb-8 flex-shrink-0">
					<div
						class="rounded-full overflow-hidden bg-gradient-to-t from-league-gold-5 to-league-gold-4"
					>
						<div class="p-1">
							<img src={data.data.summonerIconUrl} alt="Summoner Icon" class="rounded-full" />
						</div>
					</div>
					<div class="absolute -translate-y-1/2 w-32 h-6 flex items-center justify-center">
						<span
							class="px-2 bg-gradient-to-r from-league-blue-4 to-league-blue-2 text-league-hextech-black text-lg font-bold rounded-full border-4 border-league-hextech-black"
						>
							{data.data.summonerData.summonerLevel}
						</span>
					</div>
				</div>

				<div class="w-full flex flex-col justify-between pb-2">
					<h1 class="text-4xl font-bold text-league-gold-1 font-beaufort">
						{data.data.riotAccountData.gameName}
						<span class="text-league-grey-2">#{data.data.riotAccountData.tagLine}</span>
					</h1>
					<div class="w-full flex gap-16">
						{#each data.data.rankData as rankData}
							<div class="h-28 flex gap-3 items-center">
								<img
									class="h-full"
									src="https://f005.backblazeb2.com/file/pentakill/rank_{rankData.tier.toLowerCase()}.png"
									alt="{rankData.tier.toLowerCase()} rank emblem"
								/>
								<div>
									<p class="text-xs font-bold font-beaufort text-league-grey-1">
										{getRankedQueueName(rankData.queueType)}
									</p>
									<p class="text-xl font-bold font-beaufort text-league-gold-1">
										{rankData.tier}
										{rankData.rank}
									</p>
									<p class="text-xs font-spiegel text-league-grey-1">
										{rankData.wins}W {rankData.losses}L | {rankData.leaguePoints} LP
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<hr class="border-league-grey-2" />
			<div class="p-4 flex-grow">
				{#if matches}
					<div class="flex flex-col gap-4">
						{#each matches as match, i}
							<MatchHistoryItem {match} />
							<hr class="border-league-grey-3" />
						{/each}
					</div>
				{:else}
					<div class="h-full flex justify-center items-center pl-8">
						<img src="/assets/spinner.png" alt="Loading" class="w-16 h-16 animate-spin" />
					</div>
				{/if}
			</div>
			{#if matches}
				<div class="flex justify-center items-center mb-4">
					{#if loadingMatches}
						<img src="/assets/spinner.png" alt="Loading" class="w-16 h-16 m-2 animate-spin" />
					{:else}
						<button
							class="w-full h-20 text-league-gold-1 opacity-50 hover:opacity-100 font-beaufort text-2xl font-bold transition-all"
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

<script lang="ts">
	import getIconUrl from '$lib/getIconUrl';
	import getMapName from '$lib/getMapName';
	import getQueueName from '$lib/getQueueName';
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';
	import { itemDataStore, runesDataStore, summonerSpellDataStore } from '../../stores';
	import ItemBar from './ItemBar.svelte';
	import iconGold from '$lib/assets/icon_gold.png';
	import iconMinions from '$lib/assets/icon_minions.png';
	import MatchOverview from './MatchOverview.svelte';
	import { convertNumberToItemIndex } from '$lib/convertNumberToItemIndex';
	import { numberWithCommas } from '$lib/numberWithCommas';
	import MatchOverviewStats from './MatchOverviewStats.svelte';
	import MatchOverviewTimeline from './MatchOverviewTimeline.svelte';

	let { match, reload }: { match: CustomMatchDto; reload: any } = $props();

	let overviewRendered = $state(false);
	let isOverviewExpanded = $state(false);
	let overviewTab = $state('stats');

	function formatGameDuration(duration: number) {
		duration = duration / 60;
		return (
			Math.floor(duration).toString().padStart(2, '0') +
			':' +
			Math.round((((duration * 10) % 10) / 10) * 60)
				.toString()
				.padStart(2, '0')
		);
	}

	function reloadItem(beep: any) {
		overviewRendered = false;
		isOverviewExpanded = false;
	}

	$effect(() => {
		reloadItem(reload);
	});
</script>

<div>
	<button
		class="flex h-20 w-full cursor-pointer gap-2"
		onclick={() => {
			isOverviewExpanded = !isOverviewExpanded;
			overviewRendered = true;
		}}
	>
		<div class="flex h-full w-full gap-3 sm:gap-8">
			<!-- Champion Icon and Level -->
			<div
				class="my-auto aspect-square h-1/2 shrink-0 overflow-hidden rounded-lg border border-league-gold-5 sm:h-full sm:rounded-full sm:border-2"
			>
				<img
					src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{match
						.currentSummoner.championId}.png"
					alt={match.currentSummoner.championName}
					title={match.currentSummoner.championName}
					class="h-full w-full scale-[1.15]"
				/>

				{#if match.currentSummoner.teamPosition !== ''}
					<div
						class="absolute flex size-4 -translate-x-1 -translate-y-3 items-center justify-center overflow-hidden rounded-sm border border-league-gold-5 bg-league-hextech-black p-0.5 sm:size-6 sm:-translate-x-1 sm:-translate-y-5 sm:rounded-full"
					>
						<img
							src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-{match.currentSummoner.teamPosition.toLowerCase()}.png"
							alt="Position"
						/>
					</div>
				{/if}
				<div
					class="absolute flex size-4 translate-x-[1.6rem] -translate-y-3 items-center justify-center overflow-hidden rounded-sm border border-league-gold-5 bg-league-hextech-black sm:size-6 sm:translate-x-14 sm:-translate-y-5 sm:rounded-full"
				>
					<p class="font-beaufort text-[0.5rem] text-league-grey-1 sm:text-sm sm:font-medium">
						{match.currentSummoner.champLevel}
					</p>
				</div>
			</div>

			<!-- Game Info, Summoner Spells and Runes -->
			<div class="flex w-32 shrink-0 flex-col items-start">
				<p
					class="font-beaufort text-xs font-bold tracking-widest md:text-xl {match.info
						.gameDuration >= 240
						? match.currentSummoner.win
							? 'text-[#0ad1ed]'
							: 'text-[#ff2346]'
						: 'text-league-grey-2'}"
				>
					{match.info.gameDuration >= 240
						? match.currentSummoner.win
							? 'VICTORY'
							: 'DEFEAT'
						: 'REMAKE'}
				</p>
				<p class=" font-spiegel text-xs text-league-grey-1 md:text-sm">
					{getQueueName(match.info.queueId)}
				</p>

				<div class="flex gap-1 font-beaufort text-xs font-bold text-league-grey-1 md:hidden">
					<div>
						<span>
							{match.currentSummoner.kills}/{match.currentSummoner.deaths}/{match.currentSummoner
								.assists}
						</span>
					</div>
					<div class="flex items-center gap-1">
						<img src={iconMinions} alt="Minions" class="h-3" />
						<span
							>{match.currentSummoner.totalMinionsKilled +
								match.currentSummoner.neutralMinionsKilled}
						</span>
					</div>

					<div class="flex items-center gap-1">
						<img src={iconGold} alt="Gold" class="h-3" />
						<span
							>{match.currentSummoner.goldEarned > 9999
								? Math.floor(match.currentSummoner.goldEarned / 1000) + 'k'
								: match.currentSummoner.goldEarned}</span
						>
					</div>
				</div>

				<div class="mt-auto flex gap-1">
					<div class="flex border border-league-gold-5">
						<img
							src={getIconUrl(
								$summonerSpellDataStore.find(
									(spell) => spell.id === match.currentSummoner.summoner1Id
								)?.iconPath ?? ''
							)}
							alt="Summoner Spell 1"
							class="h-6"
						/>
						<img
							src={getIconUrl(
								$summonerSpellDataStore.find(
									(spell) => spell.id === match.currentSummoner.summoner2Id
								)?.iconPath ?? ''
							)}
							alt="Summoner Spell 2"
							class="h-6"
						/>
					</div>
					{#if match.currentSummoner.perks.styles[0].selections[0].perk !== 0}
						<img
							src={getIconUrl(
								$runesDataStore.find(
									(rune) => rune.id === match.currentSummoner.perks.styles[0].selections[0].perk
								)?.iconPath ?? ''
							)}
							alt="Rune 1"
							class="aspect-square h-[26px]"
						/>
					{/if}
					{#if match.currentSummoner.perks.styles[1].style !== 0}
						<img
							src={getIconUrl(
								$runesDataStore.find(
									(rune) => rune.id === match.currentSummoner.perks.styles[1].selections[0].perk
								)?.iconPath ?? ''
							)}
							alt="Rune 2"
							class="aspect-square h-[26px]"
						/>
					{/if}
				</div>
			</div>
		</div>

		<!-- Items, KDA, CS -->
		<div
			class="flex h-full w-full shrink-0 flex-col justify-center sm:w-28 sm:gap-1 md:w-64 md:gap-2"
		>
			<div class="hidden border border-league-gold-5 md:flex">
				{#each { length: 7 } as _, i}
					<ItemBar participant={match.currentSummoner} itemIndex={convertNumberToItemIndex(i)} />
				{/each}
			</div>
			<div class="h-14 w-28">
				<div
					class="grid h-full w-full grid-cols-4 grid-rows-2 gap-px bg-league-gold-5 p-px md:hidden"
				>
					{#each [0, 1, 2, 6, 3, 4, 5] as itemIndex, i}
						<div
							class=" bg-league-hextech-black {itemIndex === 6
								? 'row-span-2 flex aspect-1/2 h-[calc(100%+2px)] -translate-y-px items-center'
								: 'aspect-square h-full'}"
						>
							{#if match.currentSummoner[`item${convertNumberToItemIndex(itemIndex)}`] !== 0}
								<img
									src={getIconUrl(
										$itemDataStore.find(
											(item) =>
												item.id ===
												match.currentSummoner[`item${convertNumberToItemIndex(itemIndex)}`]
										)?.iconPath ?? ''
									)}
									alt={match.currentSummoner[
										`item${convertNumberToItemIndex(itemIndex)}`
									].toString()}
									class="w-full {itemIndex === 6 ? 'border border-l-0 border-league-gold-5' : ''}"
								/>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div
				class="hidden gap-3 font-beaufort text-sm font-bold text-league-grey-1 md:flex md:justify-between md:gap-0 md:text-lg"
			>
				<div>
					<span>
						{match.currentSummoner.kills} / {match.currentSummoner.deaths} / {match.currentSummoner
							.assists}
					</span>
				</div>
				<div class="flex items-center gap-1">
					<span
						>{match.currentSummoner.totalMinionsKilled + match.currentSummoner.neutralMinionsKilled}
					</span>
					<img src={iconMinions} alt="Minions" class="h-4" />
				</div>

				<div class="flex items-center gap-1">
					<span>{numberWithCommas(match.currentSummoner.goldEarned)}</span>
					<img src={iconGold} alt="Gold" class="h-4" />
				</div>
			</div>

			<div
				class="flex h-full w-full shrink flex-col justify-center text-left font-spiegel text-[0.5rem] text-league-grey-1 sm:hidden"
			>
				<p>{getMapName(match.info.mapId)}</p>
				<p>
					<span>{formatGameDuration(match.info.gameDuration)}</span>
					<span class="text-league-grey-3">•</span>
					<span
						>{new Date(match.info.gameCreation).toLocaleDateString(undefined, {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric'
						})}</span
					>
				</p>
			</div>
		</div>

		<!-- Map name, game duration, game date -->
		<div
			class="hidden h-full w-full shrink flex-col justify-center gap-1 pl-2 text-left font-spiegel text-xs text-league-grey-1 sm:flex sm:gap-2 sm:text-sm md:pl-8 md:text-base"
		>
			<p>{getMapName(match.info.mapId)}</p>
			<p>
				<span>{formatGameDuration(match.info.gameDuration)}</span>
				<span class="text-league-grey-3">•</span>
				<span
					>{new Date(match.info.gameCreation).toLocaleDateString(undefined, {
						day: '2-digit',
						month: '2-digit',
						year: 'numeric'
					})}</span
				>
			</p>
		</div>
	</button>

	{#if overviewRendered}
		<MatchOverview bind:expanded={isOverviewExpanded} bind:tab={overviewTab}>
			{#if overviewTab === 'stats'}
				<MatchOverviewStats {match} />
			{:else if overviewTab === 'timeline'}
				<MatchOverviewTimeline {match} expanded={isOverviewExpanded} />
			{/if}
		</MatchOverview>
	{/if}
</div>

<script lang="ts">
	import getMapName from '$lib/getMapName';
	import getQueueName from '$lib/getQueueName';
	import getRuneIcon from '$lib/getRuneIcon';
	import getSummonerSpellIcon from '$lib/getSummonerSpellIcon';
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';
	import { ddragonVersionStore, summonerSpellDataStore } from '../../stores';
	import ItemBar from './ItemBar.svelte';

	export let match: CustomMatchDto;

	function convertNumberToItemIndex(num: number) {
		return num as 0 | 1 | 2 | 3 | 4 | 5 | 6;
	}

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
</script>

<button class="h-20 flex gap-2">
	<div class="flex w-full h-full gap-8">
		<!-- Champion Icon and Level -->
		<div
			class="h-full flex-shrink-0 aspect-square rounded-full overflow-hidden border-2 border-league-gold-5"
		>
			{#if $ddragonVersionStore !== undefined}
				<img
					src="https://ddragon.leagueoflegends.com/cdn/{$ddragonVersionStore}/img/champion/{match
						.currentSummoner.championName}.png"
					alt={match.currentSummoner.championName}
					class="w-full h-full scale-[1.15]"
				/>
			{:else}
				<div class="w-full h-full animate-pulse bg-league-blue-7" />
			{/if}

			{#if match.currentSummoner.teamPosition !== ''}
				<div
					class="flex items-center justify-center absolute -translate-x-1 -translate-y-5 w-6 h-6 p-[2px] rounded-full border border-league-gold-4 bg-league-hextech-black overflow-hidden"
				>
					<img
						src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-{match.currentSummoner.teamPosition.toLowerCase()}.png"
						alt="Position"
					/>
				</div>
			{/if}
			<div
				class="flex items-center justify-center absolute translate-x-14 -translate-y-5 w-6 h-6 rounded-full border border-league-gold-4 bg-league-hextech-black overflow-hidden"
			>
				<p class="text-sm font-beaufort font-medium text-league-grey-1">
					{match.currentSummoner.champLevel}
				</p>
			</div>
		</div>

		<!-- Game Info, Summoner Spells and Runes -->
		<div class="flex flex-col items-start">
			<p
				class="font-beaufort text-xl font-medium tracking-widest {match.currentSummoner.win
					? 'text-[#0ad1ed]'
					: 'text-[#ff2346]'}"
			>
				{match.currentSummoner.win ? 'VICTORY' : 'DEFEAT'}
			</p>
			<p class="font-spiegel text-sm text-league-grey-1">
				{getQueueName(match.info.queueId)}
			</p>
			<div class="flex gap-1 mt-auto">
				<div class="flex border border-league-gold-5">
					<img
						src={getSummonerSpellIcon(match.currentSummoner.summoner1Id)}
						alt="Summoner Spell 1"
						class="h-6"
					/>
					<img
						src={getSummonerSpellIcon(match.currentSummoner.summoner2Id)}
						alt="Summoner Spell 2"
						class="h-6"
					/>
				</div>
				{#if match.currentSummoner.perks.styles[0].selections[0].perk !== 0}
					<img
						src={getRuneIcon(match.currentSummoner.perks.styles[0].selections[0].perk)}
						alt="Rune 1"
						class="h-[26px] aspect-square"
					/>
				{/if}
				{#if match.currentSummoner.perks.styles[1].style !== 0}
					<img
						src={getRuneIcon(match.currentSummoner.perks.styles[1].style)}
						alt="Rune 2"
						class="h-[26px] aspect-square"
					/>
				{/if}
			</div>
		</div>
	</div>

	<!-- Items, KDA, CS -->
	<div class="w-full h-full flex flex-col">
		<div class="flex border border-league-gold-5">
			{#each { length: 7 } as _, i}
				<ItemBar {match} itemIndex={convertNumberToItemIndex(i)} />
			{/each}
		</div>
		<div class="flex justify-between mt-auto font-beaufort font-bold text-lg text-league-grey-1">
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
				<img src={'/assets/icon_minions.png'} alt="Minions" class="h-4" />
			</div>

			<div class="flex items-center gap-1">
				<span>{match.currentSummoner.goldEarned.toLocaleString('en-US')}</span>
				<img src={'/assets/icon_gold.png'} alt="Gold" class="h-4" />
			</div>
		</div>
	</div>

	<!-- Map name, game duration, game date -->
	<div class="w-full h-full text-left font-spiegel text-league-grey-1">
		<p class="pl-8 mb-2">{getMapName(match.info.mapId)}</p>
		<p class="pl-8">
			<span>{formatGameDuration(match.info.gameDuration)}</span>
			<span class="text-league-grey-2">•</span>
			<span
				>{new Date(match.info.gameCreation).toLocaleDateString('en-US', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric'
				})}</span
			>
		</p>
	</div>
</button>

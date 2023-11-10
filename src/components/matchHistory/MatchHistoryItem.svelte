<script lang="ts">
	import getMapName from '$lib/getMapName';
	import getQueueName from '$lib/getQueueName';
	import getRuneIcon from '$lib/getRuneIcon';
	import getSummonerSpellIcon from '$lib/getSummonerSpellIcon';
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';
	import { ddragonVersionStore, summonerSpellDataStore } from '../../stores';
	import ItemBar from './ItemBar.svelte';

	export let match: CustomMatchDto;

	console.log(match);

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

<!-- svelte-ignore empty-block -->
{#if true}
	<button class="h-20 flex gap-2">
		<div class="flex w-full h-full gap-8">
			<!-- Champion Icon and Level -->
			<div class="h-full rounded-full overflow-hidden border-2 border-league-gold-5">
				{#if $ddragonVersionStore !== undefined}
					<img
						src="http://ddragon.leagueoflegends.com/cdn/{$ddragonVersionStore}/img/champion/{match
							.currentSummoner.championName}.png"
						alt={match.currentSummoner.championName}
						class="w-full h-full scale-[1.15]"
					/>
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
						{#await getSummonerSpellIcon(match.currentSummoner.summoner1Id) then spell1Icon}
							<img src={spell1Icon} alt="Summoner Spell 1" class="h-6" />
						{/await}
						{#await getSummonerSpellIcon(match.currentSummoner.summoner2Id) then spell2Icon}
							<img src={spell2Icon} alt="Summoner Spell 2" class="h-6" />
						{/await}
					</div>
					{#await getRuneIcon(match.currentSummoner.perks.styles[0].selections[0].perk) then rune1Icon}
						<img src={rune1Icon} alt="Rune 1" class="h-[26px]" />
					{/await}
					{#await getRuneIcon(match.currentSummoner.perks.styles[1].style) then rune2Icon}
						<img src={rune2Icon} alt="Rune 2" class="h-[26px]" />
					{/await}
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
				<span
					>{match.currentSummoner.totalMinionsKilled + match.currentSummoner.neutralMinionsKilled} CS</span
				>
				<span>{match.currentSummoner.goldEarned.toLocaleString('en-US')}g</span>
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
{:else}
	<div class="h-32 flex rounded-xl overflow-hidden">
		<div class="w-full p-2 {match.currentSummoner.win ? 'bg-league-blue-5' : 'bg-[#5c2029]'}">
			<div class="flex flex-col">
				<div class="flex gap-1 h-16">
					<div class="w-16 h-16 rounded-md overflow-hidden opacity-100">
						{#if $ddragonVersionStore !== undefined}
							<img
								src="http://ddragon.leagueoflegends.com/cdn/{$ddragonVersionStore}/img/champion/{match
									.currentSummoner.championName}.png"
								alt={match.currentSummoner.championName}
								class="scale-125"
							/>
						{/if}
					</div>

					<div class="flex flex-col gap-1 justify-center">
						{#if $ddragonVersionStore !== undefined && $summonerSpellDataStore !== undefined}
							{#await getSummonerSpellIcon(match.currentSummoner.summoner1Id) then spell1Icon}
								<img
									src={spell1Icon}
									alt="Summoner Spell 1"
									class="w-[30px] aspect-square rounded-md"
								/>
							{/await}
							{#await getSummonerSpellIcon(match.currentSummoner.summoner2Id) then spell2Icon}
								<img
									src={spell2Icon}
									alt="Summoner Spell 2"
									class="w-[30px] aspect-square rounded-md"
								/>
							{/await}
						{/if}
					</div>
				</div>

				<div class="text-lg font-bold text-league-gold-1">
					<span>{match.currentSummoner.kills}</span>
					<span class="text-league-grey-1.5">/</span>
					<span class="text-red-600">{match.currentSummoner.deaths}</span>
					<span class="text-league-grey-1.5">/</span>
					<span>{match.currentSummoner.assists}</span>
				</div>
				<span class="text-league-grey-1"
					>{(
						(match.currentSummoner.kills + match.currentSummoner.assists) /
						Math.max(match.currentSummoner.deaths, 1)
					).toFixed(2)} KDA</span
				>
			</div>
		</div>
	</div>
{/if}

<script lang="ts">
	import getIconUrl from '$lib/getIconUrl';
	import getMapName from '$lib/getMapName';
	import getQueueName from '$lib/getQueueName';
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';
	import { runesDataStore, summonerSpellDataStore } from '../../stores';
	import ItemBar from './ItemBar.svelte';
	import iconGold from '$lib/assets/icon_gold.png';
	import iconMinions from '$lib/assets/icon_minions.png';

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

<button class="flex h-20 gap-2">
	<div class="flex h-full w-full gap-8">
		<!-- Champion Icon and Level -->
		<div
			class="aspect-square h-full shrink-0 overflow-hidden rounded-full border-2 border-league-gold-5"
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
					class="absolute flex h-6 w-6 -translate-x-1 -translate-y-5 items-center justify-center overflow-hidden rounded-full border border-league-gold-4 bg-league-hextech-black p-0.5"
				>
					<img
						src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-{match.currentSummoner.teamPosition.toLowerCase()}.png"
						alt="Position"
					/>
				</div>
			{/if}
			<div
				class="absolute flex h-6 w-6 translate-x-14 -translate-y-5 items-center justify-center overflow-hidden rounded-full border border-league-gold-4 bg-league-hextech-black"
			>
				<p class="font-beaufort text-sm font-medium text-league-grey-1">
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
	<div class="flex h-full w-full flex-col">
		<div class="flex border border-league-gold-5">
			{#each { length: 7 } as _, i}
				<ItemBar {match} itemIndex={convertNumberToItemIndex(i)} />
			{/each}
		</div>
		<div class="mt-auto flex justify-between font-beaufort text-lg font-bold text-league-grey-1">
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
				<span>{match.currentSummoner.goldEarned.toLocaleString('en-US')}</span>
				<img src={iconGold} alt="Gold" class="h-4" />
			</div>
		</div>
	</div>

	<!-- Map name, game duration, game date -->
	<div class="h-full w-full text-left font-spiegel text-league-grey-1">
		<p class="mb-2 pl-8">{getMapName(match.info.mapId)}</p>
		<p class="pl-8">
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

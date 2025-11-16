<script lang="ts">
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';
	import { onMount } from 'svelte';
	import overviewBackground from '$lib/assets/overview_bg.jpg';
	import ItemBar from './ItemBar.svelte';
	import { convertNumberToItemIndex } from '$lib/convertNumberToItemIndex';
	import { numberWithCommas } from '$lib/numberWithCommas';
	import iconGold from '$lib/assets/icon_gold.png';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	const region = page.url.pathname.split('/')[2];
	let { match, expanded = $bindable() }: { match: CustomMatchDto; expanded: boolean } = $props();
	let firstRender = $state(true);

	onMount(() => {
		setTimeout(() => {
			firstRender = false;
		}, 1);
	});
</script>

<div
	class="w-full overflow-hidden bg-league-hextech-black transition-all duration-500 {!firstRender &&
	expanded
		? 'h-[380px] sm:h-[490px]'
		: 'h-0'}"
>
	<div
		class="my-2 overflow-hidden rounded-lg border border-league-grey-cool p-2 sm:my-4 sm:p-4"
		style="width: 100%; height: calc(100% - 16px); background-image: url({overviewBackground});"
	>
		<div>
			{#each [...match.info.teams].sort( (a, _) => (a.teamId === match.currentSummoner.teamId ? -1 : 1) ) as team, i}
				<table class="mb-1 w-full table-fixed sm:mb-4">
					<thead>
						<tr
							class="h-8 font-beaufort text-xs font-bold sm:text-base {i === 0
								? 'text-[#0a96aa]'
								: 'text-[#be1e37]'}"
						>
							<th class="w-40 text-left sm:w-56">
								<span class="mr-3 sm:mr-6">
									TEAM {team.teamId / 100}
								</span>

								<span>
									{match.info.participants.reduce(
										(acc, p) => (p.teamId === team.teamId ? acc + p.kills : acc),
										0
									)} <span class="sm:mx-1">/</span>
									{match.info.participants.reduce(
										(acc, p) => (p.teamId === team.teamId ? acc + p.deaths : acc),
										0
									)} <span class="sm:mx-1">/</span>
									{match.info.participants.reduce(
										(acc, p) => (p.teamId === team.teamId ? acc + p.assists : acc),
										0
									)}
								</span>
							</th>

							<th class="hidden w-40 md:table-cell">
								<div class="flex items-center justify-center gap-2 text-league-grey-1">
									<span>
										{numberWithCommas(
											match.info.participants.reduce(
												(acc, p) => (p.teamId === team.teamId ? acc + p.goldEarned : acc),
												0
											)
										)}
									</span>
									<img src={iconGold} alt="Gold" class="h-4" />
								</div>
							</th>

							<th
								class="w-16 px-2 text-center font-beaufort text-league-grey-2 sm:w-40 sm:pr-4 sm:pl-6"
								>KDA</th
							>

							<th class="text-center font-beaufort text-league-grey-2">CS</th>

							<th class="text-center font-beaufort text-league-grey-2">Gold</th>
						</tr>
					</thead>
					<tbody>
						{#each match.info.participants.filter((p) => p.teamId === team.teamId) as participant}
							<tr class="h-7 sm:h-9">
								<td class="overflow-hidden">
									<button
										class="group flex cursor-pointer items-center gap-1 sm:gap-2"
										onclick={() => {
											goto(
												`/summoner/${region}/${participant.riotIdGameName}-${participant.riotIdTagline}`
											);
										}}
									>
										<p class="w-4 font-beaufort text-xs text-league-gold-1 sm:w-6 sm:text-sm">
											{participant.champLevel}
										</p>
										<div
											class="size-6 overflow-hidden rounded-full border border-league-gold-4 sm:size-8 sm:border-2"
										>
											<img
												src="https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/{participant.championId}.png"
												alt={participant.championName}
												title={participant.championName}
												class="scale-[1.15]"
											/>
										</div>
										<p
											class="font-spiegel text-xs font-semibold text-league-grey-1 transition-colors group-hover:text-league-gold-1 sm:text-sm"
										>
											{participant.riotIdGameName}
										</p>
									</button>
								</td>
								<td class="hidden w-40 md:table-cell">
									<div class="flex h-6 border border-league-gold-5">
										{#each { length: 7 } as _, i}
											<ItemBar {participant} itemIndex={convertNumberToItemIndex(i)} />
										{/each}
									</div>
								</td>
								<td
									class="text-center font-beaufort text-[0.5rem] text-league-gold-1 sm:px-2 sm:pr-4 sm:pl-6 sm:text-base"
								>
									<div class="grid w-full grid-cols-11">
										<span class="col-span-3">{participant.kills}</span><span
											class="text-league-grey-2">/</span
										>
										<span class="col-span-3">{participant.deaths}</span><span
											class="text-league-grey-2">/</span
										>
										<span class="col-span-3">{participant.assists}</span>
									</div>
								</td>
								<td class="text-center font-beaufort text-[0.5rem] text-league-gold-1 sm:text-base">
									{participant.totalMinionsKilled + participant.neutralMinionsKilled}
								</td>
								<td class="text-center font-beaufort text-[0.5rem] text-league-gold-1 sm:text-base">
									{numberWithCommas(participant.goldEarned)}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/each}
		</div>
	</div>
</div>

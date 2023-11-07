<script lang="ts">
	import getSummonerIcon from '$lib/getSummonerIcon.js';

	export let data;

	console.log(data);
</script>

<main class="flex justify-center font-spiegel">
	<div class="w-[1000px] mx-16 my-8 rounded-xl border border-league-grey-2">
		<div class="p-4">
			<div class="w-32 h-32">
				{#await getSummonerIcon(data.data.summonerData.profileIconId) then icon}
					<div class="rounded-3xl overflow-hidden border border-league-grey-2">
						<img src={icon} alt="Summoner Icon" class="w-full h-full" />
					</div>
					<div class="absolute -translate-y-1/2 w-32 h-6 flex items-center justify-center">
						<span
							class="px-2 bg-gradient-to-r from-league-blue-4 to-league-blue-2 text-league-hextech-black text-lg font-bold rounded-full"
						>
							{data.data.summonerData.summonerLevel}
						</span>
					</div>
				{/await}
			</div>
		</div>
		<hr class="mt-4 border-league-grey-2" />
		<div class="p-4">
			<div class="flex flex-col gap-2">
				{#each Array(10) as _}
					<div class="h-40 bg-league-blue-7 rounded-xl" />
				{/each}
			</div>
		</div>
	</div>
</main>

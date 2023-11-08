<script lang="ts">
	import getSummonerIcon from '$lib/getSummonerIcon.js';

	export let data;

	async function getDdragonVersion() {
		return (await (await fetch('https://ddragon.leagueoflegends.com/api/versions.json')).json())[0];
	}

	async function getSummonerSpellData(ddragonVersion: string) {
		return await (
			await fetch(
				`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/summoner.json`
			)
		).json();
	}

	async function getSummonerSpellIcon(
		ddragonVersion: string,
		summonerSpellId: string,
		summonerSpellData: any
	) {
		for (const summonerSpell in summonerSpellData.data) {
			if (summonerSpellData.data[summonerSpell].key == summonerSpellId) {
				const ret = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${summonerSpellData.data[summonerSpell].image.full}`;
				return ret;
			}
		}
	}

	console.log(data);
</script>

<main class="flex justify-center font-spiegel">
	<div class="w-[1000px] mx-16 my-8 rounded-xl border border-league-grey-2">
		<div class="p-4 flex flex-row gap-8">
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

			<h1 class="text-4xl font-bold text-league-gold-1 font-beaufort">
				{data.data.summonerData.name}
			</h1>
		</div>
		<hr class="mt-4 border-league-grey-2" />
		<div class="pr-8 py-8">
			<div class="flex flex-col gap-4">
				{#await getDdragonVersion() then ddragonVersion}
					{#await getSummonerSpellData(ddragonVersion) then summonerSpellData}
						{#await data.data.matches then matches}
							{#each matches as match}
								<div class="h-32 flex rounded-2xl overflow-hidden">
									<div
										class="w-32 h-full {match.currentSummoner.win
											? 'from-league-blue-5'
											: 'from-rose-950'} to-transparent bg-gradient-to-l"
									/>
									<div
										class="w-full p-2 {match.currentSummoner.win
											? 'bg-league-blue-5'
											: 'bg-rose-950'}"
									>
										<div class="flex flex-col">
											<div class="flex gap-1 h-16">
												<div class="w-16 h-16 rounded-md overflow-hidden opacity-100">
													<img
														src="http://ddragon.leagueoflegends.com/cdn/{ddragonVersion}/img/champion/{match
															.currentSummoner.championName}.png"
														alt={match.currentSummoner.championName}
														class="scale-125"
													/>
												</div>

												<div class="flex flex-col gap-1 justify-center">
													{#await getSummonerSpellIcon(ddragonVersion, match.currentSummoner.summoner1Id, summonerSpellData) then spell1Icon}
														<img
															src={spell1Icon}
															alt="Summoner Spell 1"
															class="w-[30px] aspect-square rounded-md"
														/>
													{/await}
													{#await getSummonerSpellIcon(ddragonVersion, match.currentSummoner.summoner2Id, summonerSpellData) then spell2Icon}
														<img
															src={spell2Icon}
															alt="Summoner Spell 2"
															class="w-[30px] aspect-square rounded-md"
														/>
													{/await}
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
							{/each}
						{/await}
					{/await}
				{/await}
			</div>
		</div>
	</div>
</main>

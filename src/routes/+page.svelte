<script lang="ts">
	import { onMount } from 'svelte';
	import SocialMediaMetaTags from '../components/SocialMediaMetaTags.svelte';

	let region = 'NA';
	let summonerName = '';

	const regions = [
		'NA',
		'EUW',
		'EUNE',
		'OCE',
		'KR',
		'JP',
		'BR',
		'LAS',
		'LAN',
		'RU',
		'TR',
		'SG',
		'PH',
		'TW',
		'VN',
		'TH'
	];

	let recent: RecentSummoner[] = [];

	onMount(() => {
		document.title = 'PENTAKILL.LOL';

		let localStorageRecent = localStorage.getItem('recent') ?? '[]';
		recent = JSON.parse(localStorageRecent);

		let localStorageRegion = localStorage.getItem('region') ?? 'NA';
		if (regions.includes(localStorageRegion)) {
			region = localStorageRegion;
		}
	});

	function redirectToSummoner() {
		let newRecent = [...recent];

		if (summonerName !== '') {
			if (newRecent.length > 0) {
				let index = newRecent.findIndex((r) => r.name === summonerName && r.region === region);
				if (index !== -1) {
					newRecent.splice(index, 1);
				}

				newRecent.unshift({ region, name: summonerName });
				if (newRecent.length > 5) {
					newRecent.pop();
				}
			} else {
				newRecent = [{ region, name: summonerName }];
			}

			localStorage.setItem('recent', JSON.stringify(newRecent));

			window.location.href = `summoner/${region.toLowerCase()}/${summonerName}`;
		}
	}

	type RecentSummoner = {
		region: string;
		name: string;
	};
</script>

<SocialMediaMetaTags />

<main class="w-full h-[--main-height] flex justify-center">
	<div
		class="group mb-auto font-spiegel"
		style="margin-top: calc(calc(var(--main-height) / 2) - 2rem);"
	>
		<div
			class="w-[500px] h-16 flex gap-4 border border-league-gold-5 focus-within:border-league-gold-1 rounded-[2rem] {recent.length >
			0
				? 'focus-within:rounded-b-none'
				: ''} overflow-hidden transition-all"
		>
			<select
				class="pl-4 bg-transparent text-league-gold-4 cursor-pointer outline-none"
				bind:value={region}
				on:change={() => {
					localStorage.setItem('region', region);
				}}
			>
				{#each regions as r}
					<option class="text-league-gold-1 bg-league-hextech-black">{r}</option>
				{/each}
			</select>
			<input
				type="text"
				placeholder="Username"
				class="w-full bg-transparent text-xl text-league-gold-1 placeholder:text-league-grey-2 outline-none"
				bind:value={summonerName}
				on:keypress={(e) => {
					if (e.key === 'Enter') {
						redirectToSummoner();
					}
				}}
			/>
			<button
				class="pr-4 flex justify-center items-center text-league-gold-4 hover:text-league-gold-1 outline-none transition-all"
				on:click={redirectToSummoner}
			>
				<span class="material-symbols-outlined"> search </span>
			</button>
		</div>
		{#if recent.length > 0}
			<div
				class="opacity-0 group-focus-within:block group-focus-within:opacity-100 w-full border border-t-0 rounded-b-[2rem] overflow-hidden border-league-grey-2 transition-all"
			>
				{#each recent as r, i}
					<div class="w-full flex gap-4 hover:bg-league-blue-7">
						<a
							href={`summoner/${r.region.toLowerCase()}/${r.name}`}
							class="w-full h-16 flex gap-4 items-center justify-between text-left"
						>
							<span class="w-[76px] pl-4 text-league-gold-4">{r.region}</span>
							<span class="w-full text-xl text-league-gold-1">{r.name}</span>
						</a>
						<button
							class="pr-4 flex justify-center items-center text-league-gold-4 hover:text-league-gold-1 outline-none transition-all"
							on:click={() => {
								let newRecent = [...recent];
								newRecent.splice(i, 1);
								localStorage.setItem('recent', JSON.stringify(newRecent));
								recent = newRecent;
							}}
						>
							<span class="material-symbols-outlined"> close </span>
						</button>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>

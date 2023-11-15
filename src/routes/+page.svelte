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

	onMount(() => {
		document.title = 'PENTAKILL.LOL';

		if (!localStorage) {
			region = 'NA';
		} else {
			let localStorageRegion = localStorage.getItem('region') ?? 'NA';
			if (regions.includes(localStorageRegion)) {
				region = localStorageRegion;
			}
		}
	});

	function redirectToSummoner() {
		if (summonerName !== '') {
			window.location.href = `summoner/${region.toLowerCase()}/${summonerName}`;
		}
	}
</script>

<SocialMediaMetaTags />

<main class="w-full h-[calc(100vh-64px)] flex justify-center items-center">
	<div
		class="w-[500px] h-16 flex gap-4 border border-league-gold-5 focus-within:border-league-gold-1 rounded-full overflow-hidden font-spiegel transition-all"
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
			class="w-16 pr-4 flex justify-center items-center text-league-gold-4 hover:text-league-gold-1 outline-none transition-all"
			on:click={redirectToSummoner}
		>
			<span class="material-symbols-outlined"> search </span>
		</button>
	</div>
</main>

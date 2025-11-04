<script lang="ts">
	import { onMount } from 'svelte';
	import SocialMediaMetaTags from '../components/SocialMediaMetaTags.svelte';
	import { goto } from '$app/navigation';
	import spinner from '$lib/assets/spinner.png';

	let loading = $state(false);
	let summonerNameInputElement = $state<HTMLInputElement | null>(null);

	let region = $state('NA');
	let summonerName = $state('');

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

	let recent = $state<RecentSummoner[]>([]);

	onMount(() => {
		loading = false;
		document.title = 'PENTAKILL.LOL';

		let localStorageRecent = localStorage.getItem('recent') ?? '[]';
		recent = JSON.parse(localStorageRecent);

		let localStorageRegion = localStorage.getItem('region') ?? 'NA';
		if (regions.includes(localStorageRegion)) {
			region = localStorageRegion;
		}
	});

	function redirectToSummoner() {
		loading = true;
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

			const usernameTagArr = summonerName.split('#', 2);
			goto(`summoner/${region.toLowerCase()}/${usernameTagArr[0]}-${usernameTagArr[1]}`).finally(
				() => {
					loading = false;
				}
			);
		}
	}

	type RecentSummoner = {
		region: string;
		name: string;
	};
</script>

<SocialMediaMetaTags />

<main class="h-main-height flex w-full justify-center">
	{#if !loading}
		<div
			class="group mb-auto font-spiegel"
			style="margin-top: calc(calc(100vh - 64px) / 2 - 2rem);"
		>
			<div
				class="flex h-16 w-[500px] gap-4 rounded-4xl border border-league-gold-5 focus-within:border-league-gold-1 {recent.length >
				0
					? 'focus-within:rounded-b-none'
					: ''} overflow-hidden transition-all"
			>
				<select
					class="cursor-pointer bg-transparent pl-4 text-league-gold-4 outline-none"
					bind:value={region}
					onchange={() => {
						localStorage.setItem('region', region);
					}}
				>
					{#each regions as r}
						<option class="bg-league-hextech-black text-league-gold-1">{r}</option>
					{/each}
				</select>
				<input
					type="text"
					placeholder="Username + #TAG"
					class="placeholder:text-3 w-full bg-transparent text-xl text-league-gold-1 outline-none"
					bind:this={summonerNameInputElement}
					bind:value={summonerName}
					onkeypress={(e) => {
						if (e.key === 'Enter') {
							redirectToSummoner();
						}
					}}
				/>
				<button
					class="flex items-center justify-center pr-4 text-league-gold-4 transition-all outline-none hover:text-league-gold-1"
					onclick={redirectToSummoner}
				>
					<span class="material-symbols-outlined"> search </span>
				</button>
			</div>
			{#if recent.length > 0}
				<div
					class="w-full overflow-hidden rounded-b-4xl border border-t-0 border-league-grey-3 opacity-0 transition-all group-focus-within:block group-focus-within:opacity-100"
				>
					{#each recent as r, i}
						<div class="flex w-full gap-4 hover:bg-league-blue-7">
							<button
								data-sveltekit-preload-data="off"
								onclick={() => {
									summonerName = r.name;
									region = r.region;
									redirectToSummoner();
								}}
								class="flex h-16 w-full items-center justify-between gap-4 text-left"
							>
								<span class="w-[76px] pl-4 text-league-gold-4">{r.region}</span>
								<span class="w-full text-xl text-league-gold-1">{r.name}</span>
							</button>
							<button
								class="flex items-center justify-center pr-4 text-league-gold-4 transition-all outline-none hover:text-league-gold-1"
								onclick={(e) => {
									e.preventDefault();
									summonerNameInputElement?.focus();

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
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<img src={spinner} alt="Loading" class="h-16 w-16 animate-spin" />
		</div>
	{/if}
</main>

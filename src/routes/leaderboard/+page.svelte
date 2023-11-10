<script lang="ts">
	import { onMount } from 'svelte';

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
		let localStorageRegion = localStorage.getItem('region') ?? 'NA';
		if (regions.includes(localStorageRegion)) {
			region = localStorageRegion;
		}
	});

	let users: User[] = [];

	type User = {
		name: string;
		region: string;
	};
</script>

<main class="w-full h-[calc(100vh-64px)] flex justify-center items-center">
	<div class="w-[500px]">
		<div
			class="h-16 flex gap-4 border border-league-gold-5 focus-within:border-league-gold-1 rounded-t-[2rem] overflow-hidden font-spiegel transition-all"
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
						users = [...users, { name: summonerName, region }];
						summonerName = '';
					}
				}}
			/>
			<button
				class="w-16 pr-4 flex justify-center items-center text-league-gold-4 hover:text-league-gold-1 outline-none transition-all"
				on:click={() => {
					users = [...users, { name: summonerName, region }];
					summonerName = '';
				}}
			>
				<span class="material-symbols-outlined"> add </span>
			</button>
		</div>
		<div class="h-[500px] border border-t-0 border-league-grey-2 rounded-b-[2rem] overflow-hidden">
			<div class="w-full h-full overflow-x-hidden overflow-y-auto">
				<div>
					{#each users as user, i}
						<div
							class="h-20 px-4 flex items-center font-beaufort text-2xl bg-white {i % 2 == 0
								? 'bg-opacity-0'
								: 'bg-opacity-[0.01]'}"
						>
							<div>
								<span class="text-league-gold-1">{user.name}</span>
								<span class="text-league-gold-4"> ({user.region})</span>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<button
			class="w-2/3 h-12 -translate-y-[1px] mx-auto flex justify-center items-center border border-league-gold-5 hover:border-league-gold-1 text-league-gold-4 hover:text-league-gold-1 font-beaufort text-2xl rounded-b-3xl outline-none transition-all"
			>Create Leaderboard</button
		>
		<p class="mt-4 text-center font-spiegel text-league-grey-2">Not working yet!</p>
	</div>
</main>

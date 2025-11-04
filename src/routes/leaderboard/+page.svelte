<script lang="ts">
	import { onMount } from 'svelte';
	import SocialMediaMetaTags from '../../components/SocialMediaMetaTags.svelte';
	import getSummonerIconUrl from '$lib/getSummonerIconUrl';

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

	onMount(() => {
		let localStorageRegion = localStorage.getItem('region') ?? 'NA';
		if (regions.includes(localStorageRegion)) {
			region = localStorageRegion;
		}
	});

	let users = $state<User[]>([]);

	function addUser() {
		if (
			!(
				summonerName === '' ||
				users.find(
					(u) => u.name.toLowerCase() === summonerName.toLowerCase() && u.region === region
				)
			)
		) {
			fetch(`./leaderboard/api?region=${region}&username=${summonerName}`).then((res) =>
				res.json().then((d) => {
					console.log(d);
					if (d.status === 200) {
						const summonerData: SummonerDto = d.summonerData;

						const newUser = {
							id: summonerData.id,
							name: summonerData.name,
							region,
							icon: getSummonerIconUrl(summonerData.profileIconId)
						} as User;
						users = [newUser, ...users];
					}
				})
			);
		}

		summonerName = '';
	}

	type User = {
		id: string;
		name: string;
		region: string;
		icon: string;
	};
</script>

<SocialMediaMetaTags />

<main class="h-main-height flex w-full items-center justify-center">
	<div class="w-[500px]">
		<div
			class="flex h-16 gap-4 overflow-hidden rounded-t-4xl border border-league-gold-5 font-spiegel transition-all focus-within:border-league-gold-1"
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
				placeholder="Username"
				class="w-full bg-transparent text-xl text-league-gold-1 outline-none placeholder:text-league-grey-3"
				bind:value={summonerName}
				onkeypress={(e) => {
					if (e.key === 'Enter') {
						addUser();
					}
				}}
			/>
			<button
				class="flex w-16 items-center justify-center pr-4 text-league-gold-4 transition-all outline-none hover:text-league-gold-1"
				onclick={() => {
					addUser();
				}}
			>
				<span class="material-symbols-outlined"> add </span>
			</button>
		</div>
		<div class="h-[401px] overflow-hidden rounded-b-4xl border border-t-0 border-league-grey-3">
			<div class="h-full w-full overflow-x-hidden overflow-y-auto">
				<div>
					{#each users as user, i}
						<div
							class="flex h-20 items-center gap-4 bg-white px-4 font-beaufort text-2xl {i % 2 == 0
								? 'bg-opacity-0'
								: 'bg-opacity-[0.01]'}"
						>
							<div
								class="m-2 aspect-square w-16 overflow-hidden rounded-full border-2 border-league-gold-4"
							>
								<img src={user.icon} alt="Summoner Icon" class="h-full w-full" />
							</div>
							<div class="w-full">
								<span class="text-league-gold-1">{user.name}</span>
								<span class="text-league-gold-4"> ({user.region})</span>
							</div>
							<button
								class="flex items-center rounded-full bg-transparent p-2 text-league-gold-4 transition-all hover:bg-league-blue-7 hover:text-league-gold-1"
								onclick={() => {
									users = users.filter((u) => u.name !== user.name);
								}}
							>
								<span class="material-symbols-outlined"> close </span>
							</button>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<button
			class="mx-auto flex h-12 w-2/3 -translate-y-px items-center justify-center rounded-b-3xl border border-league-gold-5 font-beaufort text-2xl text-league-gold-4 transition-all outline-none hover:border-league-gold-1 hover:text-league-gold-1"
			onclick={() => {
				let str = '';
				for (let i = 0; i < users.length; i++) {
					str += `${users[i].region.toLowerCase()},${users[i].id}`;
					if (i !== users.length - 1) {
						str += ';';
					}
				}

				window.location.href = '/leaderboard/' + str;
			}}>Create Leaderboard</button
		>
		<p class="mt-4 text-center font-spiegel text-league-grey-3">Not working yet!</p>
	</div>
</main>

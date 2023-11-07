<script lang="ts">
	let region = 'NA';
	let summonerName = '';
</script>

<main class="w-full h-screen flex justify-center items-center">
	<div
		class="w-[500px] h-16 flex gap-4 border border-league-gold-5 focus-within:border-league-gold-1 rounded-full overflow-hidden font-spiegel transition-all"
	>
		<select
			class="pl-4 bg-transparent text-league-gold-4 cursor-pointer outline-none"
			bind:value={region}
		>
			<option class="text-league-gold-1 bg-league-hextech-black">NA</option>
			<option class="text-league-gold-1 bg-league-hextech-black">EUW</option>
		</select>
		<input
			type="text"
			placeholder="Username"
			class="w-full bg-transparent text-xl text-league-gold-1 placeholder:text-league-grey-2 outline-none"
			bind:value={summonerName}
		/>
		<button
			class="w-16 pr-4 flex justify-center items-center text-league-gold-4 hover:text-league-gold-1 outline-none transition-all"
			on:click={() => {
				if (summonerName !== '') {
					window.location.href = `summoner/${region}1/${summonerName}`;
				}
			}}
		>
			<span class="material-symbols-outlined"> search </span>
		</button>
	</div>
</main>

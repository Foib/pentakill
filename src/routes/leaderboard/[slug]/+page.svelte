<script lang="ts">
	export let data;

	let summoners = data.summoners;
</script>

<main class="w-full h-[--main-height] flex justify-center items-center">
	<ol>
		{#each summoners as summoner}
			<li>
				{summoner.name} - {summoner.summonerLevel}
			</li>
		{/each}
	</ol>

	<!-- <table>
		<thead>
			<tr>
				<th>Region</th>
				<th>Username</th>
			</tr>
		</thead>
		<tbody>
			{#each data.regions as region}
				{#each region.usernames as name}
					<tr>
						<td>{region.region}</td>
						<td>{name}</td>
					</tr>
				{/each}
			{/each}
		</tbody>
	</table> -->
</main>

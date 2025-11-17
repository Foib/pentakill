<script lang="ts">
	export let data;

	let summoners = data.summoners;
</script>

<main class="flex h-[--main-height] w-full items-center justify-center">
	<ol>
		{#each summoners as summoner}
			<li>
				{summoner.name} - {summoner.summonerLevel}
			</li>
		{/each}
	</ol>
</main>

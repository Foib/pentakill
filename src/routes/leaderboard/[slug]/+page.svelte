<script lang="ts">
	export let data;
</script>

<table>
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
</table>

<style>
	table {
		border-collapse: collapse;
	}

	th,
	td {
		border: 1px solid white;
		padding: 0.5rem;
	}
</style>

<script lang="ts">
	import getItemIcon from '$lib/getItemIcon';
	import type { CustomMatchDto } from '$lib/riotTypes/Misc';

	export let match: CustomMatchDto;
	export let itemIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6;
</script>

<div
	style="width: calc(100% / 7); aspect-ratio: 1;"
	class={itemIndex !== 6 ? 'border-r border-league-gold-5' : ''}
>
	{#if match.currentSummoner[`item${itemIndex}`] !== 0}
		{#await getItemIcon(match.currentSummoner[`item${itemIndex}`]) then itemIcon}
			<img src={itemIcon} alt="Item" class="h-full" />
		{/await}
	{/if}
</div>

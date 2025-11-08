<script lang="ts">
	import getIconUrl from '$lib/getIconUrl';
	import { itemDataStore } from '../../stores';

	let {
		participant,
		itemIndex
	}: {
		participant: ParticipantDto;
		itemIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	} = $props();
</script>

<div
	style="width: calc(100% / 7); aspect-ratio: 1;"
	class={itemIndex !== 6 ? 'border-r border-league-gold-5' : ''}
>
	{#if participant[`item${itemIndex}`] !== 0}
		<img
			src={getIconUrl(
				$itemDataStore.find((item) => item.id === participant[`item${itemIndex}`])?.iconPath ?? ''
			)}
			alt={participant[`item${itemIndex}`].toString()}
			class="h-full"
		/>
	{/if}
</div>

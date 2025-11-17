<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	let {
		expanded = $bindable(),
		tab = $bindable(),
		children
	}: { expanded: boolean; tab: string; children: Snippet<[]> } = $props();
	let firstRender = $state(true);

	onMount(() => {
		setTimeout(() => {
			firstRender = false;
		}, 1);
	});
</script>

<div
	class="w-full overflow-hidden bg-league-hextech-black transition-all duration-500 {!firstRender &&
	expanded
		? 'h-[420px] sm:h-[530px]'
		: 'h-0'}"
>
	<div class="mt-5 flex h-5 items-center gap-4">
		<button
			class="grow cursor-pointer rounded-full font-beaufort font-semibold text-league-gold-1 opacity-50 transition-all hover:bg-league-grey-4 hover:opacity-100"
			onclick={() => (tab = 'stats')}
		>
			Stats
		</button>
		<button
			class="grow cursor-pointer rounded-full font-beaufort font-semibold text-league-gold-1 opacity-50 transition-all hover:bg-league-grey-4 hover:opacity-100"
			onclick={() => (tab = 'timeline')}>Timeline</button
		>
	</div>
	<div class="h-[490px]">
		{@render children()}
	</div>
</div>

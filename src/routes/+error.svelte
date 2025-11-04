<script lang="ts">
	import { page } from '$app/state';
</script>

<div
	class="h-main-height flex w-full flex-col items-center justify-center bg-linear-to-r from-league-gold-5 to-league-gold-4 bg-clip-text text-transparent"
>
	<h1 id="error-headline" class="font-beaufort font-bold break-keep whitespace-nowrap">
		Something went wrong!
	</h1>
	<h2 id="error-message" class="font-beaufort">
		Error {page.status} - {page.error?.message}
	</h2>
</div>

<style>
	#error-headline {
		font-size: max(6vw, calc(100% * 3));
	}

	#error-message {
		font-size: max(2vw, calc(100%));
	}
</style>

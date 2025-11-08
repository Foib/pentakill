<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
	import spinner from '$lib/assets/spinner.png';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preload" type="image/png" href={spinner} />
</svelte:head>

<Navbar />
<div class="min-h-main-height relative min-w-full overflow-x-hidden md:min-w-3xl">
	<div class="bg-league-hextech-black">
		{@render children()}
	</div>
	<Footer />
</div>

<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';

	let { children } = $props();
</script>

<div class="min-w-[800px]">
	<div class="bg-league-hextech-black">
		<Navbar />
		{@render children()}
	</div>
	<Footer />
</div>

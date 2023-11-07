<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Navbar from '../components/Navbar.svelte';
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>

<div class="min-w-[1000px]">
	<div class="bg-league-hextech-black">
		<Navbar />
		<slot />
	</div>
	<Footer />
</div>

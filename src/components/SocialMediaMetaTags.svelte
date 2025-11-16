<script lang="ts">
	let {
		title = 'PENTAKILL.LOL',
		description = 'Analyze player profiles, strategize with in-depth insights and create custom leaderboards to challenge friends. Join PENTAKILL.LOL now and elevate your League of Legends experience.',
		url = 'https://www.pentakill.lol/',
		image = ''
	} = $props();
</script>

<svelte:head>
	<meta property="og:title" content={title} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={image} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content={image} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta name="twitter:image:alt" content={image} />
</svelte:head>

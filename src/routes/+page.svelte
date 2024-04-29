<script lang="ts">
	import '$lib/asstes/ui/global.scss';

	import {
		InViewport,
		isInViewPort,
		Mobile,
		Card,
		VisibleDesktop,
		VisibleMobile,
		SidebarButton,
		Sidebar,
		SidebarToggle
	} from '$lib/components/ui';

	import 'virtual:uno.css';
</script>

<Sidebar>112233</Sidebar>
<div class="wrapper">
	<header class="app-header">header</header>
	<main class="app-main">
		{$Mobile}
		{$VisibleMobile}
		{$VisibleDesktop}
		{$InViewport}
		<button
			on:click={() => {
				console.log('visibleMobile');

				VisibleMobile.set(!$VisibleMobile);
			}}>mobile</button
		>
		<button
			on:click={() => {
				console.log('visibleMobile');

				VisibleDesktop.set(!$VisibleDesktop);
			}}>PC</button
		>
		<button on:click={() => SidebarToggle()}>toggle</button>
		<h1>Welcome to SvelteKit</h1>
		<Card as="ul" class="bg-blue-50">wwww</Card>

		<SidebarButton>点击我</SidebarButton>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</main>
	<footer>footer</footer>
</div>

<script lang="ts">
	import '$lib/asstes/ui/global.scss';
	import CCard from '$lib/components/ui/CCard.svelte';
	import CSidebar from '$lib/components/ui/CSidebar.svelte';
	import CSidebarToggle from '$lib/components/ui/CSidebarToggle.svelte';
	import {
		InViewport,
		isInViewPort,
		mobile,
		visibleDesktop,
		visibleMobile,
		SidebarToggle
	} from '$lib/components/ui/Sidebar';

	import 'virtual:uno.css';
</script>

<CSidebar>112233</CSidebar>
<div class="wrapper">
	<header class="app-header">header</header>
	<main class="app-main">
		{$mobile}
		{$visibleMobile}
		{$visibleDesktop}
		{$InViewport}
		<button
			on:click={() => {
				console.log('visibleMobile');

				visibleMobile.set(!$visibleMobile);
			}}>mobile</button
		>
		<button
			on:click={() => {
				console.log('visibleMobile');

				visibleDesktop.set(!$visibleDesktop);
			}}>PC</button
		>
		<button on:click={() => SidebarToggle()}>toggle</button>
		<h1>Welcome to SvelteKit</h1>
		<CCard as="ul" class="bg-blue-50">wwww</CCard>

		<CSidebarToggle>点击我</CSidebarToggle>
		<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
	</main>
	<footer>footer</footer>
</div>

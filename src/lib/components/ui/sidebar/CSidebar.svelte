<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { InViewport, isInViewPort, Mobile, VisibleDesktop, VisibleMobile } from './CSidebarUtil';
	import { BROWSER } from 'esm-env';

	export let position: 'fixed' | 'sticky' = 'fixed';
	export let overlaid: boolean = false;
	let ref: HTMLElement | undefined = undefined;

	onMount(() => {
		handleResize();
		if (BROWSER) {
			window.addEventListener('keyup', handleKeyup);
			window.addEventListener('mouseup', handleClickOutside);
			ref?.addEventListener('mouseup', handleOnClick);
			ref?.addEventListener('transitionend', () => {
				ref && InViewport.set(isInViewPort(ref));
			});
		}
	});
	onDestroy(() => {
		if (BROWSER) {
			window.removeEventListener('mouseup', handleClickOutside);
			window.removeEventListener('keyup', handleKeyup);
			ref?.removeEventListener('mouseup', handleOnClick);
			ref?.removeEventListener('transitionend', () => {
				ref && InViewport.set(isInViewPort(ref));
			});
		}
	});

	const isOnMobile = (element: HTMLElement) =>
		Boolean(getComputedStyle(element).getPropertyValue('--cui-is-mobile'));

	const handleVisibleChange = (visible: boolean) => {
		if ($Mobile) {
			VisibleMobile.set(visible);
			return;
		}

		VisibleDesktop.set(visible);
	};

	const handleHide = () => {
		console.log('handleHide');

		handleVisibleChange(false);
	};

	const handleResize = () => {
		ref && Mobile.set(isOnMobile(ref));
		ref && InViewport.set(isInViewPort(ref));
	};

	const handleKeyup = (event: Event) => {
		console.log('handleKeyup');

		if ($Mobile && ref && !ref.contains(event.target as HTMLElement)) {
			handleHide();
		}
	};

	const handleClickOutside = (event: Event) => {
		console.log('handleClickOutside');

		if ($Mobile && ref && !ref.contains(event.target as HTMLElement)) {
			handleHide();
		}
	};

	const handleOnClick = (event: Event) => {
		console.log('handleOnClick');

		const target = event.target as HTMLAnchorElement;
		target &&
			target.classList.contains('nav-link') &&
			!target.classList.contains('nav-group-toggle') &&
			$Mobile &&
			handleHide();
	};
</script>

<svelte:window on:resize={handleResize} />
<aside
	bind:this={ref}
	class="sidebar"
	class:sidebar-fixed={position == 'fixed'}
	class:sidebar-sticky={position == 'sticky'}
	class:show={($Mobile && $VisibleMobile) || (overlaid && $VisibleDesktop)}
	class:hide={!$VisibleDesktop && !$Mobile && !overlaid}
>
	<slot />
</aside>
{#if $Mobile && $VisibleMobile}
	<div class="sidebar-backdrop"></div>
{/if}

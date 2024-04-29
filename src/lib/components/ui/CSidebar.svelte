<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { InViewport, isInViewPort, mobile, visibleDesktop, visibleMobile } from './Sidebar';
	import { browser } from '$app/environment';

	export let position: 'fixed' | 'sticky' = 'fixed';
	export let overlaid: boolean = false;
	let ref: HTMLElement | undefined = undefined;

	onMount(() => {
		handleResize();
		if (browser) {
			window.addEventListener('keyup', handleKeyup);
			window.addEventListener('mouseup', handleClickOutside);
			ref?.addEventListener('mouseup', handleOnClick);
			ref?.addEventListener('transitionend', () => {
				ref && InViewport.set(isInViewPort(ref));
			});
		}
	});
	onDestroy(() => {
		if (browser) {
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
		if ($mobile) {
			visibleMobile.set(visible);
			return;
		}

		visibleDesktop.set(visible);
	};

	const handleHide = () => {
		console.log('handleHide');

		handleVisibleChange(false);
	};

	const handleResize = () => {
		ref && mobile.set(isOnMobile(ref));
		ref && InViewport.set(isInViewPort(ref));
	};

	const handleKeyup = (event: Event) => {
		console.log('handleKeyup');

		if ($mobile && ref && !ref.contains(event.target as HTMLElement)) {
			handleHide();
		}
	};

	const handleClickOutside = (event: Event) => {
		console.log('handleClickOutside');

		if ($mobile && ref && !ref.contains(event.target as HTMLElement)) {
			handleHide();
		}
	};

	const handleOnClick = (event: Event) => {
		console.log('handleOnClick');

		const target = event.target as HTMLAnchorElement;
		target &&
			target.classList.contains('nav-link') &&
			!target.classList.contains('nav-group-toggle') &&
			$mobile &&
			handleHide();
	};
</script>

<svelte:window on:resize={handleResize} />
<aside
	bind:this={ref}
	class="sidebar"
	class:sidebar-fixed={position == 'fixed'}
	class:sidebar-sticky={position == 'sticky'}
	class:show={($mobile && $visibleMobile) || (overlaid && $visibleDesktop)}
	class:hide={!$visibleDesktop && !$mobile && !overlaid}
>
	<slot />
</aside>
{#if $mobile && $visibleMobile}
	<div class="sidebar-backdrop"></div>
{/if}
